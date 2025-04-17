import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup(){
    const[signupForm,setSignupForm] = useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()

    function handleSignupChange(event){
     const newFormState = {...signupForm,[event.target.name]:event.target.value}
     setSignupForm(newFormState)
    }

     function handleSignupSubmit(event){
        event.preventDefault()
        axios({
            method:'POST',
            url:'http://localhost:8080/users/register',
            data:signupForm
        })
        .then((response)=>{
            alert(response.data.msg)
            navigate('/login')
         })
        .catch((error)=>alert(error.response.data.msg))
        setSignupForm({
           name:"",
           email:"",
           password:""
        })
    }

    function handleLoginClick(){
        navigate('/login')
    }

    return <>
    <div>
       <form onSubmit={handleSignupSubmit} className="Form-div">
       <h1>Register!</h1>
        <input type="text" placeholder="name..." name="name" value={signupForm.name} onChange={handleSignupChange} required/>
        <input type="email" placeholder="email..." name="email" value={signupForm.email} onChange={handleSignupChange} required/>
        <input type="text" placeholder="password..." name="password" value={signupForm.password} onChange={handleSignupChange} required/>
        <input type="submit" />
        <h3>Already user, click Login</h3>
        <button onClick={handleLoginClick}>Login</button>
       </form>
    </div>
    </>
}

export {Signup}