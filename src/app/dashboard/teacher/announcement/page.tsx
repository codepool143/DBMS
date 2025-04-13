'use client';

import { useEffect, useState } from 'react';

type Announcement = {
  id: number;
  title: string;
  message: string;
  created_at: string;
};

export default function AdminAnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcement');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load announcements.');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title.trim() || !message.trim()) {
      setError('Title and message are required.');
      return;
    }

    setLoading(true);
    setError('');
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `/api/announcement/${editingId}`
      : '/api/announcement';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message }),
      });

      if (!res.ok) throw new Error('Submission failed.');

      setTitle('');
      setMessage('');
      setEditingId(null);
      await fetchAnnouncements();
    } catch (err) {
      console.error(err);
      setError('Failed to submit announcement.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setTitle(announcement.title);
    setMessage(announcement.message);
    setEditingId(announcement.id);
    setError('');
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this announcement?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/announcement/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete.');
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete announcement.');
    }
  };

  return (
    <div className="bg-white min-h-screen text-black p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Manage Announcements</h1>

        <div className="space-y-2 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-black rounded bg-white text-black"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-black rounded bg-white text-black"
          />
          <button
            onClick={handleAddOrUpdate}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {editingId ? 'Update' : 'Add'} Announcement
          </button>
          {error && <p className="text-red-600">{error}</p>}
          {loading && <p className="text-gray-700">Processing...</p>}
        </div>

        <ul className="space-y-4">
          {announcements.map((a) => (
            <li key={a.id} className="border border-black p-4 rounded shadow-sm bg-white text-black">
              <h2 className="text-lg font-semibold">{a.title}</h2>
              <p>{a.message}</p>
              <p className="text-sm text-gray-600">
                Posted on {new Date(a.created_at).toLocaleString()}
              </p>
              <div className="mt-2 flex gap-4">
                <button
                  onClick={() => handleEdit(a)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
