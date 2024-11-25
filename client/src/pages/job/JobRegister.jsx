import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
const JobRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('job_seeker');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
          await axios.post(`${import.meta.env.VITE_API}/job/register`, { name, email, password, role });
          toast.success('Registration Successful');
          window.location = '/joblogin';
        } catch (err) {
            setError(err.message)
          console.error(err.message);
          toast.error('Registration Failed');
        }
      };
      {loading && <p className="text-center">loading...</p>}
    
  return (
    <div>
         <div className="p-4 mt-10">
         {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4 max-w-sm mx-auto">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border rounded"
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 border rounded"
        >
          <option value="job_seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
    </div>
  )
}

export default JobRegister
