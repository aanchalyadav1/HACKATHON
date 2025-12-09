import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getStats } from '../utils/api';

export default function Dashboard(){
  const [stats, setStats] = useState({ sessions:0, uploads:0 });
  const [series, setSeries] = useState([]);

  useEffect(()=>{
    getStats().then(s => { if(s) setStats(s); }).catch(()=>{});
    setSeries([{name:'Day 1', value:5},{name:'Day 2', value:8},{name:'Day 3', value:6},{name:'Day 4', value:10}]);
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="card p-4"> <div style={{fontWeight:800,fontSize:22}}>{stats.sessions}</div><div style={{color:'var(--muted)'}}>Active Sessions</div></div>
        <div className="card p-4"> <div style={{fontWeight:800,fontSize:22}}>{stats.uploads}</div><div style={{color:'var(--muted)'}}>Uploaded Salary Slips</div></div>
        <div className="card p-4"> <div style={{fontWeight:800,fontSize:22}}>₹5k+</div><div style={{color:'var(--muted)'}}>Typical Loan Range</div></div>
      </div>

      <div className="card mt-6 p-4">
        <h4>Usage</h4>
        <div style={{height:240}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}><XAxis dataKey="name"/><YAxis/><Tooltip/><Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={3} /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
