
type Announcement = {
  id: number;
  title: string;
  message: string;
  created_at: string;
};

async function getAnnouncements(): Promise<Announcement[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/announcement`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Fetch failed:", res.status, res.statusText);
    throw new Error("Failed to fetch announcements");
  }

  return res.json();
}

export default async function AnnouncementPage() {
  // const session = await getServerSession(authOptions);

  // if (!session || session.user?.role !== "admin") {
  //   redirect("/login");
  // }

  const announcements = await getAnnouncements();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        📢 Announcements
      </h1>

      {announcements.length === 0 ? (
        <div className="text-center text-gray-500">No announcements yet.</div>
      ) : (
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li
              key={announcement.id}
              className="border border-blue-300 rounded-xl p-5 shadow-md bg-blue-50 hover:bg-blue-100 transition"
            >
              <h2 className="text-xl font-semibold text-black mb-1">
                {announcement.title}
              </h2>
              <p className="text-black mb-2">{announcement.message}</p>
              <p className="text-sm text-gray-600">
                Posted on:{" "}
                {new Date(announcement.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
