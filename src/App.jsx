import Dashboard from './pages/Dashboard';
import DeckCreation from './pages/DeckCreation';
import StudySession from './pages/StudySession';
import EditDeck from './pages/EditDeck';
import SetUser from './pages/SetUser';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <SetUser onSetUser={setUser} />
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/deckcreation" element={<DeckCreation />}></Route>
      <Route path="/studysession/:deckId" element={<StudySession />}></Route>
      <Route path="/editdeck/:deckId" element={<EditDeck />}></Route>
    </Routes>
  );
}

export default App
