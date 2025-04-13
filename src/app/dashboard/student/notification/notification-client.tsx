"use client";

import React, { useState } from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}

interface NotificationClientProps {
  initialNotifications: Notification[];
}

export default function NotificationClient({ initialNotifications }: NotificationClientProps) {
  const [notifications] = useState<Notification[]>(initialNotifications);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-white">
              No notifications yet
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <p className="text-gray-800 mb-2">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
