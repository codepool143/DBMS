"use client";

import { BookOpenCheck, ClipboardEdit, Users, UserCog } from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
     
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
        <div className="text-2xl font-bold text-purple-700">Teacher Panel</div>
        <nav className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
            <BookOpenCheck size={20} /> Manage Courses
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
            <ClipboardEdit size={20} /> Assignments
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
            <Users size={20} /> Student List
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
            <UserCog size={20} /> Profile Settings
          </div>
        </nav>
      </aside>

      
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Welcome back, Teacher!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Manage Courses</h2>
            <p className="text-gray-600">Create and update your courses.</p>
          </div>

        
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Assignments</h2>
            <p className="text-gray-600">Assign homework and check submissions.</p>
          </div>

       
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Students</h2>
            <p className="text-gray-600">View and manage enrolled students.</p>
          </div>

          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
            <p className="text-gray-600">Update your teacher profile and preferences.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
