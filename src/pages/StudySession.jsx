import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import { useParams } from "react-router-dom";
import { getDecks, saveDecks } from "../utils/storage";
import { useDeck } from "../hooks/useDeck";
import '../styles/pages/studysession.css';
import CompleteSession from "./CompleteSession";

function StudySession () {
    const { deckId } = useParams();
    const { deck, setDeck, currentCardIndex, setCurrentCardIndex } = useDeck(deckId);
    const [showBack, setShowBack] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setincorrectCount] = useState([]);
    const [isSessionComplete, setIsSessionComplete] = useState(false);

    useEffect(() => {
        setCurrentCardIndex(0);
    }, [deckId]);

    useEffect(() => {
        console.log(deck);
    }, [deck])

    const handleCorrectAnswer = () => {
        const editedCard = {
            ...deck.cards[currentCardIndex],
            masteryCount: deck.cards[currentCardIndex].masteryCount + 1,
            mastered: deck.cards[currentCardIndex].masteryCount + 1 >= 5,
            masteredOn: deck.cards[currentCardIndex].masteryCount + 1 >= 5 
                ? new Date().toISOString().split("T")[0]
                : deck.cards[currentCardIndex].masteredOn || null
        }

        const updatedCards = [...deck.cards];
        updatedCards[currentCardIndex] = editedCard;

        const updatedDeck = { ...deck, cards: updatedCards };
        setDeck(updatedDeck);

        const allDecks = getDecks();
        const updatedDecks = allDecks.map(d => d.id === deck.id ? updatedDeck : d);
        saveDecks(updatedDecks);

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

    const determineResultMessage = () => {
        if (correctCount === deck.cards.length) {
            return <h2>You got 100%!</h2>
        } else {
            return (
                <div className="incorrect-card-list">
                    <h2 className="color-attention">Cards you <br />missed:</h2>
                    <ol>
                        {incorrectCount.map(card => (
                            <li key={card.id}>{card.front} / {card.back}</li>
                        ))}
                    </ol>
                </div>
            )
                
        }
    }

    if (!deck) return <p>Deck not found...</p>

    if (isSessionComplete) {
        return (
            <CompleteSession 
                score={`${correctCount}/${deck.cards.length} | ${((correctCount/deck.cards.length) * 100).toFixed(0)}%`}
                incorrect={determineResultMessage()}
            />
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
                        <Button label="X" type="attention" onclick={() => handleIncorrectAnswer()}/>
                        <Button label="&#x2713;" type="success" onclick={() => handleCorrectAnswer()}/>
                    </div>               
                </div>
                
            </div>
        </div>
    );
}

export default StudySession