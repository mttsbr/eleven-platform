// CALENDAR PAGE - ELEVEN PLATFORM
import React, { useState } from 'react';

export default function CalendarPage() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    date: '',
    start: '',
    end: '',
    match: '',
    player: '',
    notes: ''
  });

  const handleSubmit = () => {
    if (!form.date || !form.start || !form.end) return;
    setAppointments(prev => [...prev, form]);
    setForm({ date: '', start: '', end: '', match: '', player: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <div className="text-xl font-bold">eleven•</div>
        <div className="text-right">
          <div>John Doe</div>
          <div className="text-sm text-gray-500">AS Monaco</div>
        </div>
      </header>

      <nav className="flex gap-4 px-6 py-3 border-b bg-gray-100 relative z-20">
        <button className="hover:text-blue-600">Recruitment</button>
        <button className="hover:text-blue-600">Analysis</button>
        <button className="hover:text-blue-600">Distribution</button>
        <button className="hover:text-blue-600">Transfers</button>
        <button className="hover:text-blue-600">Messenger</button>
      </nav>

      <div className="px-6 py-4 text-lg font-semibold border-b bg-white">📆 CALENDAR</div>

      <div className="flex flex-col md:flex-row gap-6 px-6 py-6">
        {/* Left Side - Appointment Input */}
        <div className="flex-1 bg-white rounded-xl p-4 shadow">
          <h2 className="text-md font-semibold mb-4">New Appointment</h2>
          <div className="space-y-3">
            <input type="date" className="w-full border p-2 rounded" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            <div className="flex gap-2">
              <input type="time" className="w-1/2 border p-2 rounded" value={form.start} onChange={e => setForm({...form, start: e.target.value})} placeholder="Start Time" />
              <input type="time" className="w-1/2 border p-2 rounded" value={form.end} onChange={e => setForm({...form, end: e.target.value})} placeholder="End Time" />
            </div>
            <input className="w-full border p-2 rounded" placeholder="Match (optional)" value={form.match} onChange={e => setForm({...form, match: e.target.value})} />
            <input className="w-full border p-2 rounded" placeholder="Player to watch (optional)" value={form.player} onChange={e => setForm({...form, player: e.target.value})} />
            <textarea className="w-full border p-2 rounded" placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={3} />
            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white p-2 rounded mt-2">Add Appointment</button>
          </div>
        </div>

        {/* Right Side - Calendar & Appointments */}
        <div className="flex-1 bg-white rounded-xl p-4 shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Calendar</h3>
            <select className="border rounded p-1 text-sm">
              <option>April 2025</option>
              <option>May 2025</option>
              {/* More months */}
            </select>
          </div>

          {/* Placeholder Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="aspect-square border rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                {i % 7 === 0 ? (i / 7 + 1) : ''}
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-md font-semibold mb-2">Appointments</h4>
            <ul className="space-y-2">
              {appointments.map((a, idx) => (
                <li key={idx} className="border p-2 rounded text-sm">
                  <div className="font-medium">{a.date} — {a.start} to {a.end}</div>
                  {a.match && <div>Match: {a.match}</div>}
                  {a.player && <div>Player: {a.player}</div>}
                  {a.notes && <div>Notes: {a.notes}</div>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
