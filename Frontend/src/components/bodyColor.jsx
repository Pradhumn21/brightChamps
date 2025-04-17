import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function BodyColor() {
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/reset-password') {
            document.body.style.backgroundColor = 'rgb(129,23,207)'
        } else if (location.pathname === '/login') {
            document.body.style.backgroundColor = 'rgb(129,23,207)'
        } else {
            document.body.style.backgroundColor = 'rgb(255,255,255)'
        }

        return () => {
            document.body.style.backgroundColor = 'rgb(255,255,255)'
        }
    }, [location.pathname])

    return null
}

export default BodyColor