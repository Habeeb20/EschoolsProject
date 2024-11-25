import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast"
const JobLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
          const res = await axios.post(`${import.meta.env.VITE_API}/job/login`, { email, password });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          toast.success('Login Successful');
          window.location = '/joblist';
        } catch (err) {
          setError(err.message)
          console.error(err.message);
          toast.error('Login Failed');
        } finally{
            setLoading(false)
        }
      };
      {loading && <p className="text-center">loading...</p>}
    
    
  return (
    <div>

    <div className="p-4 mt-10">
    {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border rounded"
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
      
    </div>
  )
}

export default JobLogin
