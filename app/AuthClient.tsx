"use client"

import { useState } from "react"
import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient()


export default function AuthClient() {

  type FormType = 'Sign Up' | 'Sign In' | 'Sign Out' 
  const [ shownForm, setShownForm ] = useState('Sugn Up')
  const [ justSignedUp, setJustSignedUp ] = useState(false)
  const { data: session } = authClient.useSession()
   
  function sendSignupReq(e: React.FormEvent<HTMLFormElement>){
     e.preventDefault()
     const formData = new FormData(e.currentTarget)
     authClient.signUp.email({
        email: formData.get("email") as string,
        name: formData.get("name") as string,
        password: formData.get("password") as string
      },
    {
      onSuccess: ()=>{
        setJustSignedUp(true)
        setTimeout(()=>{setJustSignedUp(false)}, 2000)
      }
    })
    }

   function sendSigninReq(e: React.FormEvent<HTMLFormElement>){
     const formData = new FormData(e.currentTarget)
     authClient.signIn.email({
        email: formData.get("email") as string,
        password: formData.get("password") as string
      })
    }

  function drawButton(lb : FormType) {
    return (
                <button className={`${shownForm === lb ?
                'bg-gray-600 text-white' : 
                'bg-gray-200' } text-black px-5 py-2 rounded-lg 
                 font-bold`}
                 onClick = {() => setShownForm(lb)}
                >{lb}</button>)

                }
  
    
  return (
    <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl m-5 p-2">Hello {session ? session.user.email : 'Guest'}</h1>
        <div className="flex justify-around w-full max-w-md mb-8">
        {drawButton('Sign Up')}
        {drawButton('Sign In')}
        {drawButton('Sign Out')}
      </div>
      

 
{shownForm === 'Sign Up' && <>   
  <h2 className="text-2xl">Sign Up Form</h2>
    <form className="flex flex-col items-center"
    onSubmit={sendSignupReq}>
    <label htmlFor="signup-email">Email:</label>
    <input id="singup-email" name="email" type="email" placeholder="Email" />
    <label htmlFor="name">Name:</label>
    <input id="name" name="name" type="text" placeholder="Name" />
    <label htmlFor="signup-password">Password:</label>
    <input id="singup-password" name="password" type="password" placeholder="Password" />
    <button type="submit"  className="bg-purple-200 px-5 m-10 text-black">Sign Up</button>
  </form>
  </>}

 
{shownForm === 'Sign In' && <>   
  <h2 className="text-2xl">Sign In Form</h2>
    <form className="flex flex-col items-center"
    onSubmit={sendSigninReq}>
    <label htmlFor="signup-email">Email:</label>
    <input id="singup-email" name="email" type="email" placeholder="Email" />
    <label htmlFor="signup-password">Password:</label>
    <input id="singup-password" name="password" type="password" placeholder="Password" />
    <button type="submit"  className="bg-purple-200 text-black px-5 m-10">Sign In</button>
  </form>
  </>}

  {shownForm === 'Sign Out' && <>
  <h2 className="text-2xl">Log Out Form</h2>
  <button type="submit"  className="bg-purple-200 text-black px-5 m-10"
  onClick={()=> { authClient.signOut()}}>Sign Out</button>
  </>
  }   


  {justSignedUp && <p className="text-green-500">Successfully Signed Up!</p>} 


 </div>
  )
}
