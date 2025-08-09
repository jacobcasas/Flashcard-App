import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import { useParams } from "react-router-dom";
import { getDecks, saveDecks } from "../utils/storage";
import { useDeck } from "../hooks/useDeck";
import '../styles/pages/studysession.css';

function StudySession () {
    const { deckId } = useParams();
    const { deck, setDeck, currentCardIndex, setCurrentCardIndex } = useDeck(deckId);
    const [showBack, setShowBack] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setincorrectCount] = useState([]);
    const [isSessionComplete, setIsSessionComplete] = useState(false);

    useEffect(() => {
        setCurrentCardIndex(0);
    }, [deck]);

    const handleCorrectAnswer = () => {
        setCorrectCount(correctCount + 1);
        goToNextCard();
    }

    const handleIncorrectAnswer = () => {
        setincorrectCount(prev => [...prev, deck.cards[currentCardIndex]]);
        goToNextCard();
    }

    const goToNextCard = () => {
        const nextIndex = currentCardIndex + 1;
        if (currentCardIndex === deck.cards.length - 1) {
            setIsSessionComplete(true);
        } else {
            setCurrentCardIndex(nextIndex);
            setShowBack(false);
        }
    }

    if (!deck) return <p>Deck not found...</p>

    if (isSessionComplete) {
        return (
            <h1>Hello World!</h1>
        )
    }
    
    return (
        <div className="page-container">
            <header className="study-session-heading">
                <h1>Study Session: {deck.title}</h1>
                <h5 className="color-gray-400">{deck.description}</h5>
            </header>

            <div className="study-card-and-count">
                <h3 className="center-text">Card {currentCardIndex + 1}/{deck.cards.length}</h3>
                <div className="study-card">
                    <h4>
                        {showBack 
                            ? deck.cards[currentCardIndex]?.back
                            : deck.cards[currentCardIndex]?.front
                        }
                    </h4>
                </div>
            </div>
            
            <div className="study-under-card">
                <Button label="Flip Card" type="neutral" onclick={() => setShowBack(!showBack)}/>
                <div className="correct-prompt">
                    <h5>Did you guess correctly?</h5>
                    <div className="prompt-buttons">
                        <Button label="X" type="attention" onclick={() => handleCorrectAnswer()}/>
                        <Button label="&#x2713;" type="success" onclick={() => handleIncorrectAnswer()}/>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}

export default StudySession