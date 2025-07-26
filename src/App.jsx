import Dashboard from './pages/Dashboard';
import DeckCreation from './pages/DeckCreation';
import StudySession from './pages/StudySession';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/deckcreation" element={<DeckCreation />}></Route>
      <Route path="/studysession" element={<StudySession />}></Route>
    </Routes>
  );
}

export default App
