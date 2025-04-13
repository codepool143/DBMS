'use client'
import React, { useState } from 'react';
import { Bell, Send, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}

interface NotificationClientProps {
  initialNotifications: Notification[];
}

export default function NotificationClient({ initialNotifications }: NotificationClientProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [newMessage, setNewMessage] = useState('');
  const [isAdmin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage.trim() }),
      });

      if (!response.ok) throw new Error('Failed to create notification');
      
      const data = await response.json();
      setNotifications(prev => [data, ...prev]);
      setNewMessage('');
    } catch (err) {
      console.error(err);
      setError('Failed to create notification');
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete notification');
      
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete notification');
    }
  };

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        </div>

        {isAdmin && (
          <form onSubmit={addNotification} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your notification message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-white">
              No notifications yet
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="text-gray-800 mb-2">{notification.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}