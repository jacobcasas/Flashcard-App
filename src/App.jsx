import Dashboard from './pages/Dashboard';
import DeckCreation from './pages/DeckCreation';
import StudySession from './pages/StudySession';
import EditDeck from './pages/EditDeck';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {

  const getDeck = localStorage.getItem("decks");
  const deckDetails = JSON.parse(getDeck);

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
