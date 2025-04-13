"use client";

import Link from "next/link";
import { Bell, UserPlus,Megaphone,FileText  } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
        <div className="text-2xl font-bold text-red-600">Admin Panel</div>
        <nav className="space-y-4">
        <Link href="/dashboard/admin/user_management" className="flex items-center gap-2 hover:text-red-600">
            <UserPlus size={20} /> User Management
          </Link>
          <Link href="/dashboard/admin/report" className="flex items-center gap-2 hover:text-red-600">
            <FileText  size={20} /> Reports
          </Link>
          <Link href="/dashboard/admin/announcement" className="flex items-center gap-2 hover:text-red-600">
            <Megaphone size={20} /> Announcements
          </Link>
          <Link href="/dashboard/admin/notification" className="flex items-center gap-2 hover:text-red-600">
            <Bell size={20} /> Notifications
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Welcome back, Admin!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">User Management</h2>
            <p className="text-gray-600">Add, remove, or edit users and assign roles.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Reports & Logs</h2>
            <p className="text-gray-600">Access system reports and activity logs.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Site Settings</h2>
            <p className="text-gray-600">Update application configuration and preferences.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Access Control</h2>
            <p className="text-gray-600">Manage role-based access and permissions.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
