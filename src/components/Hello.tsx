type PropsType = {
    message: string
}


export default function Hello (props: PropsType) {
    return <>
        {
            props.message
        }
    </>
}

