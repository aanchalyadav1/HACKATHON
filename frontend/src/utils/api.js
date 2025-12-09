import axios from "axios";
const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export async function sendChat(message, sessionId, user){
  const r = await axios.post(`${BASE}/api/chat`, { message, sessionId, user }).catch(err => { throw err; });
  return r.data;
}

export async function uploadSalary(file){
  const fd = new FormData(); fd.append('file', file);
  const r = await axios.post(`${BASE}/api/upload-salary`, fd, { headers: {'Content-Type':'multipart/form-data'}});
  return r.data;
}

export async function getStats(){
  const r = await axios.get(`${BASE}/api/admin/stats`).then(r=>r.data).catch(()=>null);
  return r;
}

export async function requestSanction(payload){
  const r = await axios.post(`${BASE}/api/sanction`, payload, { responseType: 'blob' }).catch(err => { throw err; });
  return r.data;
}
