import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const api = {
  chat: (message) =>
    axios.post(`${API_BASE}/api/chat`, { message }).then((r) => r.data),
  uploadSalary: (file) => {
    const fd = new FormData();
    fd.append("file", file);
    return axios.post(`${API_BASE}/api/upload-salary`, fd);
  },
  stats: () => axios.get(`${API_BASE}/api/admin/stats`).then((r) => r.data),
};
