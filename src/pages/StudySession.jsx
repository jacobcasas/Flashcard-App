import { useEffect } from "react";
import Button from "../components/Button/Button";
import { useParams } from "react-router-dom";
import { getDecks, saveDecks } from "../utils/storage";
import { useDeck } from "../hooks/useDeck";
import '../styles/pages/studysession.css'

function StudySession () {
    const { deckId } = useParams();
    const { deck, setDeck, currentCardIndex, setCurrentCardIndex } = useDeck(deckId);

    if (!deck) return <p>Deck not found...</p>
    
    return (
        <div className="page-container">
            <header className="study-session-heading">
                <h1>Study Session: {deck.title}</h1>
                <h5 className="color-gray-400">{deck.description}</h5>
            </header>
            
        </div>
    );
}

export default StudySession