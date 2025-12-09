import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState(''); const [password,setPassword] = useState('');
  const nav = useNavigate();

  async function handleLogin(e){
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth, email, password);
      nav('/chat');
    }catch(err){
      alert('Login failed: ' + err.message);
    }
  }

  async function handleGoogle(){
    const provider = new GoogleAuthProvider();
    try{
      await signInWithPopup(auth, provider);
      nav('/chat');
    }catch(err){ alert('Google sign-in failed'); }
  }

  return (
    <div className="container" style={{display:'flex',justifyContent:'center'}}>
      <form onSubmit={handleLogin} className="card p-6" style={{width:360}}>
        <h3>Login</h3>
        <input className="input mt-4" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input mt-4" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="mt-4" />
        <button className="btn" type="submit">Sign In</button>
        <button type="button" className="btn-ghost mt-3" onClick={handleGoogle}>Sign in with Google</button>
        <div style={{marginTop:12, color:'var(--muted)'}}>Or continue as <button className="btn-ghost" onClick={()=>nav('/chat')} type="button">Guest</button></div>
      </form>
    </div>
  );
}
