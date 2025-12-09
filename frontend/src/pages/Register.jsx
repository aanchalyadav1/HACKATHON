import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName] = useState(''); const [email,setEmail] = useState(''); const [password,setPassword] = useState('');
  const nav = useNavigate();

  async function handleRegister(e){
    e.preventDefault();
    try{
      await createUserWithEmailAndPassword(auth, email, password);
      nav('/chat');
    }catch(err){
      alert('Registration failed: ' + err.message);
    }
  }

  return (
    <div className="container" style={{display:'flex',justifyContent:'center'}}>
      <form onSubmit={handleRegister} className="card p-6" style={{width:420}}>
        <h3>Create account</h3>
        <input className="input mt-4" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input mt-4" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input mt-4" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="mt-4" />
        <button className="btn" type="submit">Create Account</button>
      </form>
    </div>
  );
}
