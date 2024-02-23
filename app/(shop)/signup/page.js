'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [created, setCreated] = useState(false)
    const [error,setError] = useState(false)

    const router = useRouter()
    const  handleSubmit = async (e) => {
        e.preventDefault()
            setCreated(true)
            setError(false)
            const response = await fetch('/api/register',{
            method: 'POST', 
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok){
            setCreated(true)
            router.push('/login')
        }else {
            setError(true)
        }
    }
  return (
    <div className="h-[70%] bg-[#fafafa] w-screen">
      <h1 className="text-3xl font-bold text-center mt-10">Sign Up</h1>
      {created && <p className="text-center text-green-500">User created</p>}
      {error && <p className="text-center text-red-500">User already exists</p>}
      <form className="max-w-md mx-auto my-10" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          disabled={created}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 border-gray-300 bg-gray-200 block w-full my-4 rounded-lg disabled:bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          required
          disabled={created}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 border-gray-300 bg-gray-200 block w-full my-4 rounded-lg disabled:bg-gray-700"
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full w-full disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          Sign up
        </button>
        
      </form>
    </div>
  );
}

export default LoginPage