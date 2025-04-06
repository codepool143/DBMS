// In your "StudentDashboard.tsx"
import { Book, ClipboardList, GraduationCap, User } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  
  if (!session || session.user.role !== "student") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
  
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
        <div className="text-2xl font-bold text-blue-700">Student Panel</div>
        <nav className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-700">
            <Book size={20} /> My Courses
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-700">
            <ClipboardList size={20} /> Assignments
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-700">
            <GraduationCap size={20} /> Grades
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-700">
            <User size={20} /> Profile Settings
          </div>
        </nav>
      </aside>

    
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Welcome back, Student!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">My Courses</h2>
            <p className="text-gray-600">View and manage your enrolled courses.</p>
          </div>

         
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Assignments</h2>
            <p className="text-gray-600">Check upcoming and submitted assignments.</p>
          </div>

         
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Grades</h2>
            <p className="text-gray-600">Track your performance and grades here.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
            <p className="text-gray-600">Update your info and preferences.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
