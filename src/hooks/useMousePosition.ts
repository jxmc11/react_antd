import { useEffect, useState } from "react"

const useMousePosition = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })
    useEffect(() => {
        const positionUpdate = (e: MouseEvent) => {
            setPosition({
                x: e.pageX,
                y: e.pageY
            })
        }
        document.addEventListener('mousemove', positionUpdate)
        return () => {
            document.removeEventListener('mousemove', positionUpdate)
        }
    }, [])
    return position
}

export default useMousePosition