import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Login(){
    const[formEmail,setFormEmail] = useState('')
    const[formPassword,setFormPassword] = useState('')
     let navigate = useNavigate()

      function handleEmail(event){
        setFormEmail(event.target.value)
      }

      function handlePassword(event){
        setFormPassword(event.target.value)
      }

      function handleLoginSubmit(event){
        event.preventDefault()
        let object = {email:formEmail,password:formPassword}
        axios({
            method:'POST',
            url:'https://brightchamps-1.onrender.com/login',
            data: object
        })
        .then((response)=>{
          if(response.data.token){
            localStorage.setItem('token',response.data.token)
            alert('Login Successfull');
          }else{
            alert(response.data.msg)
            navigate('/')
          }
        })
        .catch((error)=>alert(error.response.data.msg))
        setFormEmail('')
        setFormPassword('')
      }

    return <>
       <form onSubmit={handleLoginSubmit} className="Form-div">
        <h1>Login!</h1>
        <input type="email" placeholder="email..." value={formEmail} onChange={handleEmail} required/>
         <input type="text" placeholder="password..." value={formPassword} onChange={handlePassword}  required/>
         <input type="submit" />
        <br />
         <Link to='/reset-password' className="links">Forget Password</Link>
       </form>
    </>
}
export {Login}