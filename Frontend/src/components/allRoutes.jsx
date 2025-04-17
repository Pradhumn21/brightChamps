import { Routes,Route } from "react-router-dom"
import { Signup } from "./signup"
import { Login } from "./login"
import { ResetPassword } from "./resetPassword"
import BodyColor from "./bodyColor"

function AllRoutes(){
    return <>
    <BodyColor />
    <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Signup/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
    </>
}

export default AllRoutes