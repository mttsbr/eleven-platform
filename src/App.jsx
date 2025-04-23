import { useState } from 'react';

const initialPlayers = [
  { name: 'John Dame', position: 'GK', age: 22, nationality: 'ENG', value: '€3.5M' },
  { name: 'Carlos Mendes', position: 'DL', age: 25, nationality: 'ESP', value: '€5M' },
  { name: 'Luca Bianchi', position: 'MC', age: 28, nationality: 'ITA', value: '€6.5M' },
  { name: 'Ali Kamara', position: 'FW', age: 24, nationality: 'FRA', value: '€9M' }
];

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [filter, setFilter] = useState('All');
  const [shadowTeam, setShadowTeam] = useState([]);
  const [reportPlayer, setReportPlayer] = useState(null);
  const [reportNote, setReportNote] = useState('');
  const [reports, setReports] = useState([]);

  const handleDropToShadow = (player) => {
    if (!shadowTeam.includes(player)) {
      setShadowTeam([...shadowTeam, player]);
    }
  };

  const handleCreateReport = () => {
    if (reportPlayer && reportNote) {
      setReports([...reports, {
        player: reportPlayer,
        note: reportNote,
        author: 'John Doe'
      }]);
      setReportPlayer(null);
      setReportNote('');
    }
  };

  const filteredPlayers =
