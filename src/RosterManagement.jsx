// [ELEVEN PLATFORM]
import React, { useState, useEffect } from 'react';

const FORMATIONS = {
  '4-4-2': [['GK'], ['DL', 'DL', 'DL', 'DL'], ['MC', 'MC', 'MC', 'MC'], ['FW', 'FW']],
  '4-3-3': [['GK'], ['DL', 'DL', 'DL', 'DL'], ['MC', 'MC', 'MC'], ['FW', 'FW', 'FW']],
  '3-5-2': [['GK'], ['DL', 'DL', 'DL'], ['MC', 'MC', 'MC', 'MC', 'MC'], ['FW', 'FW']]
};

export default function RosterManagement() {
  const [players, setPlayers] = useState([
    { name: 'Marco', surname: 'Rossi', position: 'GK', age: 27, nationality: 'ITA', value: '€2.5M' },
    { name: 'Lucas', surname: 'Herrera', position: 'GK', age: 30, nationality: 'ARG', value: '€3.2M' },
    { name: 'Andreas', surname: 'Möller', position: 'GK', age: 24, nationality: 'GER', value: '€2.8M' },
    { name: 'Pierre', surname: 'Dupont', position: 'DL', age: 26, nationality: 'FRA', value: '€4.5M' },
    { name: 'João', surname: 'Costa', position: 'DL', age: 23, nationality: 'POR', value: '€3.9M' },
    { name: 'Emil', surname: 'Petrov', position: 'DL', age: 29, nationality: 'BUL', value: '€2.2M' },
    { name: 'Victor', surname: 'Svensson', position: 'DL', age: 25, nationality: 'SWE', value: '€3.0M' },
    { name: 'Leonardo', surname: 'Mancini', position: 'MC', age: 27, nationality: 'ITA', value: '€6.0M' },
    { name: 'Daan', surname: 'van Dijk', position: 'MC', age: 25, nationality: 'NED', value: '€5.4M' },
    { name: 'Rui', surname: 'Neves', position: 'MC', age: 30, nationality: 'POR', value: '€4.9M' },
    { name: 'Sofiane', surname: 'Haddadi', position: 'MC', age: 23, nationality: 'ALG', value: '€3.7M' },
    { name: 'Jacob', surname: 'Johansson', position: 'MC', age: 26, nationality: 'SWE', value: '€5.2M' },
    { name: 'Thiago', surname: 'Santos', position: 'FW', age: 26, nationality: 'BRA', value: '€7.1M' },
    { name: 'Jamal', surname: 'Okeke', position: 'FW', age: 22, nationality: 'NGA', value: '€6.5M' },
    { name: 'Lorenzo', surname: 'Grimaldi', position: 'FW', age: 28, nationality: 'ITA', value: '€5.8M' },
    { name: 'Miguel', surname: 'Alvarado', position: 'FW', age: 24, nationality: 'COL', value: '€4.6M' }
  ]);

  const [filter, setFilter] = useState('All');
  const [shadowTeam, setShadowTeam] = useState([]);
  const [formation, setFormation] = useState('4-4-2');
  const [pitch, setPitch] = useState({ layout: {}, extra: [] });
  const [showModal, setShowModal] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: '', surname: '', position: 'GK', age: '', nationality: '', value: '€' });

  const filteredPlayers = filter === 'All' ? players : players.filter(p => p.position === filter);

  useEffect(() => {
    const flatRoles = FORMATIONS[formation].flat();
    const counts = flatRoles.reduce((acc, r) => {
      acc[r] = (acc[r] || 0) + 1;
      return acc;
    }, {});

    const layout = {};
    const assignedCount = {};
    const extra = [];

    Object.keys(counts).forEach(role => {
      layout[role] = Array(counts[role]).fill(null);
      assignedCount[role] = 0;
    });

    for (const p of shadowTeam) {
      const pos = p.position;
      if (layout[pos] && assignedCount[pos] < layout[pos].length) {
        layout[pos][assignedCount[pos]] = p;
        assignedCount[pos]++;
      } else {
        extra.push(p);
      }
    }

    setPitch({ layout, extra });
  }, [shadowTeam, formation]);

  const addToShadow = (player) => {
    setShadowTeam(prev => [...prev, player]);
  };

  const removeFromShadow = (player) => {
    setShadowTeam(prev => prev.filter(p => p.name !== player.name || p.surname !== player.surname));
  };

  const isInShadowTeam = (player) => shadowTeam.some(p => p.name === player.name && p.surname === player.surname);

  const formatValue = (valueStr) => {
    const num = parseInt(valueStr.replace(/[^\d]/g, ''));
    if (isNaN(num)) return '€0';
    if (num >= 1000000) return `€${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `€${Math.round(num / 1000)}k`;
    return `€${num}`;
  };

  const handleCreatePlayer = () => {
    const formattedValue = formatValue(newPlayer.value);
    setPlayers(prev => [...prev, { ...newPlayer, value: formattedValue }]);
    setShowModal(false);
    setNewPlayer({ name: '', surname: '', position: 'GK', age: '', nationality: '', value: '€' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans relative">
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <div className="text-xl font-semibold">[LOGO] Football Suite</div>
        <div className="text-right">
          <div>John Doe</div>
          <div className="text-sm text-gray-500">AS Monaco</div>
        </div>
      </header>

      <nav className="flex gap-4 px-6 py-3 border-b bg-gray-100">
        <a href="#" className="text-blue-600 font-medium">Recruitment</a>
        <a href="#">Analysis</a>
        <a href="#">Distribution</a>
        <a href="#">Transfers</a>
        <a href="#">Messenger</a>
      </nav>

      <div className="px-6 py-4 text-lg font-semibold border-b bg-white">ROSTER MANAGEMENT</div>

      <div className="flex flex-col md:flex-row gap-6 px-6 py-6">
        <div className="flex-1 bg-white rounded-xl p-4 shadow relative z-0">
          <label htmlFor="filter">Filter by Position:</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="block w-full mt-1 mb-2 border rounded p-2">
            <option value="All">All</option>
            <option value="GK">Goalkeepers</option>
            <option value="DL">Defenders</option>
            <option value="MC">Midfielders</option>
            <option value="FW">Forwards</option>
          </select>
          <button onClick={() => setShowModal(true)} className="mb-4 w-full bg-blue-100 border border-blue-500 text-blue-600 rounded p-2 text-sm">+ Add new player</button>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Position</th>
                <th className="text-left py-2">Age</th>
                <th className="text-left py-2">Nationality</th>
                <th className="text-left py-2">Value</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{player.name} {player.surname}</td>
                  <td className="py-2">{player.position}</td>
                  <td className="py-2">{player.age}</td>
                  <td className="py-2">{player.nationality}</td>
                  <td className="py-2">{player.value}</td>
                  <td className="py-2">
                    {!isInShadowTeam(player) && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={() => addToShadow(player)}>
                        + Add
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1 bg-white rounded-xl p-4 shadow relative z-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Shadow Team</h3>
            <select value={formation} onChange={(e) => setFormation(e.target.value)} className="border rounded p-2">
              <option value="4-4-2">4-4-2</option>
              <option value="4-3-3">4-3-3</option>
              <option value="3-5-2">3-5-2</option>
            </select>
          </div>

          <div className="flex flex-col items-center gap-4 p-4 bg-green-50 rounded border mb-4">
            {FORMATIONS[formation].map((line, idx) => (
              <div key={idx} className="flex justify-center gap-2 w-full">
                {line.map((role, i) => {
                  const player = pitch.layout[role]?.[i];
                  return (
                    <div key={i} className="relative bg-gray-200 rounded-full text-sm text-center w-20 h-12 flex items-center justify-center">
                      {player ? (
                        <>
                          {player.name.charAt(0)}. {player.surname} ({player.position})
                          <button onClick={() => removeFromShadow(player)} className="absolute top-0 right-1 text-red-500 text-xs">x</button>
                        </>
                      ) : role}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-600 mb-2 font-medium">Substitutes / Overflow</div>
          <ul className="list-disc pl-5">
            {pitch.extra.map((p, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{p.name} {p.surname} - {p.position}</span>
                <button onClick={() => removeFromShadow(p)} className="text-red-500 text-xs ml-2">x</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-lg space-y-4 w-full max-w-md">
            <h2 className="text-lg font-bold">Add New Player</h2>
            <input className="w-full border rounded p-2" placeholder="Name" value={newPlayer.name} onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})} />
            <input className="w-full border rounded p-2" placeholder="Surname" value={newPlayer.surname} onChange={(e) => setNewPlayer({...newPlayer, surname: e.target.value})} />
            <select className="w-full border rounded p-2" value={newPlayer.position} onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}>
              <option value="GK">Goalkeeper</option>
              <option value="DL">Defender</option>
              <option value="MC">Midfielder</option>
              <option value="FW">Forward</option>
            </select>
            <input className="w-full border rounded p-2" placeholder="Age" value={newPlayer.age} onChange={(e) => setNewPlayer({...newPlayer, age: e.target.value})} />
            <input className="w-full border rounded p-2" placeholder="Nationality" value={newPlayer.nationality} onChange={(e) => setNewPlayer({...newPlayer, nationality: e.target.value})} />
            <input className="w-full border rounded p-2" placeholder="Value" value={newPlayer.value} onChange={(e) => setNewPlayer({...newPlayer, value: e.target.value})} />
            <div className="flex justify-end gap-2">
              <button className="text-gray-500" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleCreatePlayer}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
