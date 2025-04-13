"use client";
import React, { useEffect, useState } from 'react';

type LoginLog = {
  id: number;
  user_id: number;
  name: string;
  email: string;
  login_time: string;
};

const AdminReportPage: React.FC = () => {
  const [logs, setLogs] = useState<LoginLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch('/api/admin/logins');
      const data = await res.json();
      setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Admin Login Report</h1>
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Login Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.id} className="border-t hover:bg-black-50 transition">
                <td className="px-6 py-3 text-black">{index + 1}</td>
                <td className="px-6 py-3 text-black">{log.name}</td>
                <td className="px-6 py-3 text-black">{log.email}</td>
                <td className="px-6 py-3 text-black">{new Date(log.login_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportPage;
