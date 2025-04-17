import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ResetPassword(){
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
            url:'http://localhost:8080/users/reset-password',
            data: object
        })
        .then((response)=>{
          if(response.data.token){
            localStorage.setItem('token',response.data.token)
            alert('password reset Successfull');
          }else{
            alert(response.data.msg)
            navigate('/login')
          }
        })
        .catch((error)=>alert(error.response.data.msg))
        setFormEmail('')
        setFormPassword('')
      }

    return <>
       <form onSubmit={handleLoginSubmit} className="Form-div">
        <h1>Reset Password!</h1>
        <input type="email" placeholder="email..." value={formEmail} onChange={handleEmail} required/>
         <input type="text" placeholder="password..." value={formPassword} onChange={handlePassword}  required/>
         <input type="submit" />
       </form>
    </>
}
export {ResetPassword}