import { useReducer, useState } from "react"
import Schema, { RuleItem, ValidateError } from "async-validator"
import { each, mapValues } from 'lodash-es'

export type CustomRuleFunc = ({ getFieldValue }: {
    getFieldValue(name: FieldDetail['name']): FieldDetail['value']
}) => RuleItem
export type CustomRule = RuleItem | CustomRuleFunc
export interface FieldDetail {
    name: string
    value: string
    rules: CustomRule[]
    isValid: boolean
    errors: ValidateError[]
}

export interface FieldsState {
    [key: string]: FieldDetail
}

export interface FormState {
    isValid: boolean
    isSubmiting: boolean
    errors: Record<string, ValidateError[]>
}

export interface ValidateErrorType extends Error {
    errors: ValidateError[],
    fields: Record<string, ValidateError[]>
}

export interface FieldsAction {
    type: 'addField' | 'updateValue' | 'updateValidateResult'
    name: string
    value: any
}

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
    switch (action.type) {
        case 'addField':
            return {
                ...state,
                [action.name]: {
                    ...action.value
                }
            }
        case "updateValue":
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    value: action.value
                }
            }
        case 'updateValidateResult':
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    isValid: action.value.isValid,
                    errors: action.value.errors
                }
            }
        default:
            return state
    }
}


function useStore() {

    const [form, setForm] = useState<FormState>({
        isValid: true,
        isSubmiting: false,
        errors: {}
    })

    const [fields, dispatch] = useReducer(fieldsReducer, {})

    const getFieldValue = (key: string) => {
        return fields[key] && fields[key].value
    }

    const transFromRules = (rules: CustomRule[]) => {
        return rules.map(rule => {
            if (typeof rule === 'function') {
                const calledRule = rule({ getFieldValue })
                return calledRule
            } else {
                return rule
            }
        })
    }

    const validateField = async (name: string) => {
        const { value, rules } = fields[name]
        const afterRules = transFromRules(rules)
        const decriptor = {
            [name]: afterRules
        }
        const valueMap = {
            [name]: value
        }
        const validator = new Schema(decriptor)
        let isValid = true, errors: ValidateError[] = [];
        try {
            await validator.validate(valueMap)
        } catch (e) {
            isValid = false
            const err = e as any
            console.log('error', err.errors)
            console.log('fields', err.fields)
            errors = err.errors
        } finally {
            console.log('errors', isValid)
            dispatch({
                type: 'updateValidateResult',
                name,
                value: {
                    isValid, errors
                }
            })
        }
    }

    const validateAllField = async () => {
        let isValid = true
        let errors: FormState['errors'] = {}

        const valueMap = mapValues(fields, item => item.value)
        const descriptor = mapValues(fields, item => transFromRules(item.rules))

        const validator = new Schema(descriptor)
        setForm({
            ...form,
            isSubmiting: true
        })
        try {
            await validator.validate(valueMap)
        } catch (e) {
            isValid = false
            const err = e as ValidateErrorType
            errors = err.fields
            each(fields, (value, name) => {
                if (errors[name]) {
                    const itemErrors = errors[name]
                    dispatch({
                        type: 'updateValidateResult',
                        name,
                        value: {
                            isValid: false,
                            errors: itemErrors
                        }
                    })
                } else if (value.rules.length > 0 && !errors[name]) {
                    dispatch({
                        type: 'updateValidateResult',
                        name,
                        value: {
                            isValid: true,
                            errors: []
                        }
                    })
                }
            })
        } finally {
            setForm({
                ...form,
                isSubmiting: false,
                isValid,
                errors
            })
            return {
                isValid,
                errors,
                values: valueMap
            }
        }
    }

    return {
        fields,
        form,
        dispatch,
        validateField,
        validateAllField,
        getFieldValue
    }

}

export default useStore