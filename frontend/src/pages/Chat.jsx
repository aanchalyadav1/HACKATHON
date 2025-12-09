import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TypingIndicator from '../components/TypingIndicator';
import { sendChat, uploadSalary } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Chat(){
  const [messages, setMessages] = useState([{ from:'bot', agent:'ALIS', text:'Welcome to ALIS. Ask about loans, upload salary slip, or type PAN.' }]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [typing, setTyping] = useState(false);
  const { user } = useAuth() || {};
  const chatRef = useRef();

  useEffect(()=>{ chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior:'smooth' }); }, [messages]);

  function push(m){ setMessages(s=>[...s,m]); }

  async function sendMsg(){
    if(!input.trim()) return;
    const txt = input.trim();
    push({ from:'user', text: txt });
    setInput('');
    setTyping(true);

    try{
      const resp = await sendChat(txt, sessionId, user || {name:'Guest'});
      if(resp.sessionId) setSessionId(resp.sessionId);
      if(resp.reply) push({ from:'bot', agent: resp.agent || 'ALIS', text: resp.reply });
      else push({ from:'bot', text:'No response' });
    }catch(err){
      console.error(err);
      push({ from:'bot', text:'Error processing request.' });
    } finally { setTyping(false); }
  }

  async function handleUpload(e){
    const f = e.target.files?.[0];
    if(!f) return;
    push({ from:'user', text:`Uploaded ${f.name}`});
    try{
      const r = await uploadSalary(f);
      push({ from:'bot', agent:'VerificationAgent', text: r.message || 'Salary uploaded.' });
    }catch(e){
      push({ from:'bot', text:'Upload failed.'});
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{margin:0}}>AI Chat</h2>
          <div style={{color:'var(--muted)'}}>User: {user?.name || 'Guest'}</div>
        </div>

        <div className="mt-4" style={{display:'flex', gap:20}}>
          <div style={{flex:1}}>
            <div className="chat-window" ref={chatRef}>
              <div style={{display:'flex', flexDirection:'column'}}>
                {messages.map((m,i) => (
                  <div key={i} style={{display:'flex', flexDirection:'column', alignItems: m.from==='user' ? 'flex-end' : 'flex-start'}}>
                    <div className={`msg-bubble ${m.from==='user' ? 'msg-user' : 'msg-bot'}`} style={{maxWidth:'84%'}}>
                      {m.agent && <div style={{fontSize:11, color:'var(--muted)', marginBottom:6}}>{m.agent}</div>}
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {typing && <div style={{display:'flex'}}><div className="msg-bot msg-bubble"><TypingIndicator /></div></div>}
              </div>
            </div>

            <div className="mt-4" style={{display:'flex', gap:10}}>
              <input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type: loan / PAN ABCDE1234F / salary 50000 / sanction" />
              <button className="btn" onClick={sendMsg}>Send</button>
            </div>
          </div>

          <aside className="w-80">
            <div className="card">
              <h4 style={{margin:0}}>Quick Actions</h4>
              <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:10}}>
                <button className="btn" onClick={()=>setInput('I want a loan')}>Demo Loan</button>
                <button className="btn" onClick={()=>setInput('PAN ABCDE1234F')}>Demo PAN</button>
                <label className="btn btn-ghost" style={{cursor:'pointer', display:'inline-block', textAlign:'center'}}>
                  Upload Salary
                  <input type="file" onChange={handleUpload} style={{display:'none'}} />
                </label>
                <button className="btn-ghost" onClick={()=>setInput('sanction sample')}>Download Sanction</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
