// [ELEVEN PLATFORM]
import React, { useState, useEffect } from 'react';

const FORMATIONS = {
  '4-4-2': [['GK'], ['DL', 'DL', 'DL', 'DL'], ['MC', 'MC', 'MC', 'MC'], ['FW', 'FW']],
  '4-3-3': [['GK'], ['DL', 'DL', 'DL', 'DL'], ['MC', 'MC', 'MC'], ['FW', 'FW', 'FW']],
  '3-5-2': [['GK'], ['DL', 'DL', 'DL'], ['MC', 'MC', 'MC', 'MC', 'MC'], ['FW', 'FW']]
};

export default function RosterManagement() {
  const [players, setPlayers] = useState([
    { number: '1', name: 'John', surname: 'Doe', position: 'GK', age: 27, nationality: 'ITA', value: '€2.5M' },
  ]);

  const [filter, setFilter] = useState('All');
  const [shadowTeam, setShadowTeam] = useState([]);
  const [formation, setFormation] = useState('4-4-2');
  const [pitch, setPitch] = useState({ layout: {}, extra: [] });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
const [editingIndex, setEditingIndex] = useState(null);
  const [newPlayer, setNewPlayer] = useState({ name: '', surname: '', position: 'GK', age: '', nationality: '', value: '€', number: '' });

  const isDuplicateNumber = players.some((p, i) => p.number === newPlayer.number && i !== editingIndex);
  const isNumberInvalid = isDuplicateNumber || newPlayer.number.length > 2;
  const isFormValid = newPlayer.name && newPlayer.surname && newPlayer.age && newPlayer.nationality && newPlayer.value.trim() !== '€' && !isNumberInvalid;

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
  const openEditModal = (player, index) => {
    setNewPlayer({ ...player });
    setEditingIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };
  
  const formatValue = (valueStr) => {
    const num = parseInt(valueStr.replace(/[^\d]/g, ''));
    if (isNaN(num)) return '€0';
    if (num >= 1000000) return `€${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `€${Math.round(num / 1000)}k`;
    return `€${num}`;
  };

  const handleCreatePlayer = () => {
    const formattedValue = formatValue(newPlayer.value);
  
    if (isEditing && editingIndex !== null) {
      // aggiorna lista giocatori
      const updatedPlayers = [...players];
      updatedPlayers[editingIndex] = { ...newPlayer, value: formattedValue };
      setPlayers(updatedPlayers);
  
      // aggiorna anche lo shadowTeam, se il giocatore è presente
      const updatedShadowTeam = shadowTeam.map(p =>
        p.name === players[editingIndex].name && p.surname === players[editingIndex].surname
          ? { ...newPlayer, value: formattedValue }
          : p
      );
      setShadowTeam(updatedShadowTeam);
    } else {
      setPlayers(prev => [...prev, { ...newPlayer, value: formattedValue }]);
    }
  
    // reset e chiusura
    setShowModal(false);
    setNewPlayer({ name: '', surname: '', position: 'GK', age: '', nationality: '', value: '€', number: '' });
    setIsEditing(false);
    setEditingIndex(null);
  };
  
  


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans relative">      <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
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

      <div className="px-6 py-4 text-lg font-semibold border-b bg-white">👥 ROSTER MANAGEMENT</div>

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
          <div className="flex justify-between items-center mb-4">
  <button
    onClick={() => {
      setNewPlayer({ name: '', surname: '', position: 'GK', age: '', nationality: '', value: '€', number: '' });
      setIsEditing(false);
      setEditingIndex(null);
      setShowModal(true);
    }}
    className="bg-blue-100 border border-blue-500 text-blue-600 rounded p-2 text-sm w-full"
  >
    + Add new player
  </button>
</div>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2">No.</th>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Position</th>
                <th className="text-left py-2">Age</th>
                <th className="text-left py-2">Country</th>
                <th className="text-left py-2">Value</th>
                <th className="text-left py-2"></th>
                <th className="text-left py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{player.number || '-'}</td>
                  <td className="py-2">{player.name} {player.surname}</td>
                  <td className="py-2">{player.position}</td>
                  <td className="py-2">{player.age}</td>
                  <td className="py-2">{player.nationality}</td>
                  <td className="py-2">{player.value}</td>
                  <td className="py-2">
  {isInShadowTeam(player) ? null : (
    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={() => addToShadow(player)}>
      + Add
    </button>
  )}
</td>
<td className="py-2">
  <button
    className="text-xs text-gray-400 hover:text-gray-700 transition duration-150"
    title="Edit"
    onClick={() => openEditModal(player, index)}
  >
    Edit
  </button>
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
              <div key={idx} className="flex justify-center gap-4 w-full py-4">
                {line.map((role, i) => {
                  const player = pitch.layout[role]?.[i];
                  return (
                    <div key={i} className="flex flex-col items-center w-20">
  <div className="relative w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
    {player ? (
      <>
        <button
          onClick={() => removeFromShadow(player)}
          className="absolute top-0.5 right-1 text-red-500 text-xs"
        >
          x
        </button>
        {player.position}
      </>
    ) : (
      role
    )}
  </div>
  {player && (
    <div className="text-xs text-center mt-1 leading-tight">
      {player.name.charAt(0)}. {player.surname}
    </div>
  )}
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
            <div className="relative">
  <input
    className={`w-full border rounded p-2 pr-28 ${isNumberInvalid ? 'border-red-400 text-red-600' : ''}`}
    placeholder="Shirt Number"
    type="number"
    value={newPlayer.number}
    onChange={(e) => {
      const val = e.target.value.slice(0, 2);
      setNewPlayer({ ...newPlayer, number: val });
    }}
  />
  {isDuplicateNumber && (
    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-xs font-medium">
      Already taken
    </div>
  )}
</div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none pointer-events-none">€</span>
              <input
                type="text"
                className="w-full border rounded p-2 pl-6"
                placeholder="Value"
                value={newPlayer.value.replace(/^€\s*/, '')}
                onChange={(e) => setNewPlayer({ ...newPlayer, value: `€ ${e.target.value}` })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button className="text-gray-500" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className={`px-4 py-1 rounded ${isFormValid ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={!isFormValid}
                onClick={handleCreatePlayer}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
