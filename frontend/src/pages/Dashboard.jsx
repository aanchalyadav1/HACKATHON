// src/pages/Dashboard.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const data = {
  labels: ['Day 1','Day 2','Day 3','Day 4'],
  datasets: [
    {
      label: 'Usage',
      data: [4,7,12,9],
      fill: true,
      tension: 0.35,
      borderColor: '#2be8ff',
      backgroundColor: 'rgba(43,232,255,0.08)'
    }
  ]
};

export default function Dashboard(){
  return (
    <div className="page container-page px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="metric">
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm text-white/60">Active Sessions</div>
        </div>
        <div className="metric">
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm text-white/60">Uploaded Salary Slips</div>
        </div>
        <div className="metric">
          <div className="text-3xl font-bold">₹5k+</div>
          <div className="text-sm text-white/60">Typical Loan Range</div>
        </div>
      </div>

      <div className="glass p-4 mt-6">
        <div className="text-sm text-white/70 mb-3">Usage</div>
        <div style={{height:300}}>
          <Line data={data} options={{plugins:{legend:{display:false}}, maintainAspectRatio:false}} />
        </div>
      </div>
    </div>
  );
}
