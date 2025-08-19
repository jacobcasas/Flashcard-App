import { useEffect, useState } from "react";
import Button from "../components/Button/Button"
import '../styles/pages/editdeck.css'
import { useParams } from "react-router-dom";
import { getDecks, saveDecks } from '../utils/storage';
import { useDeck } from "../hooks/useDeck";
import TrashCanIcon from "../assets/trash-can.svg";

function EditDeck () {

    const { deckId } = useParams();
    const { deck, setDeck, currentCardIndex, setCurrentCardIndex} = useDeck(deckId);
    const [frontCard, setFrontCard] = useState('');
    const [backCard, setBackCard] = useState('');
    const [isFrontOfCard, setIsFrontOfCard] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const [isPrevDisabled, setIsPrevDisabled] = useState(false);

    useEffect(() => {
        if (!deck) return;
        const card = deck.cards[currentCardIndex];
        setFrontCard(card?.front || '');
        setBackCard(card?.back || '');
        localStorage.setItem(`editIndex_${deckId}`, currentCardIndex);
    }, [deck, currentCardIndex, deckId]);

    useEffect(() => {
        setIsNextDisabled(!(frontCard && backCard));
    }, [frontCard, backCard]);

    useEffect(() => {
        setIsPrevDisabled(currentCardIndex === 0);
    }, [currentCardIndex]);
    
    const updateDeckCards = (newCards) => {
        const reIndexedCards = newCards.map((card, index) => ({
            ...card,
            number: index + 1
        }))

        const updatedDeck = { ...deck, cards: reIndexedCards };
        setDeck(updatedDeck);

        const allDecks = getDecks();
        const updatedDecks = allDecks.map(d => d.id === deck.id ? updatedDeck : d);
        saveDecks(updatedDecks);
    }

    const handleNextButton = () => {
        const editedCard = {
            id: crypto.randomUUID(),
            front: frontCard,
            back: backCard,
            masteryCount: 0,
        }

        let updatedCards;

        if (currentCardIndex < deck.cards.length) {
            const newCards = [...deck.cards];
            newCards[currentCardIndex] = editedCard;
            updatedCards = newCards;
        } else {
            updatedCards = [...deck.cards, editedCard];
        }

        updateDeckCards(updatedCards)
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFrontOfCard(true);
        setFrontCard('');
        setBackCard('');
    }
    
    const handlePrevButton = () => {
        setCurrentCardIndex(currentCardIndex - 1);
        setIsFrontOfCard(true);
    }

    const handleDeleteCardButton = (cardId) => {
        const filteredCards = deck.cards.filter(card => card.id !== cardId);

        updateDeckCards(filteredCards);
        setCurrentCardIndex(prev => Math.max(0, Math.min(prev, filteredCards.length - 1)));
    }

    const handleCardInput = (e) => {
        const value = e.target.value;
        isFrontOfCard ? setFrontCard(value) : setBackCard(value);
    }

    if (!deck) return <p className="center-text">Deck not found...</p>;

    return (
        <div className="page-container">
            <header className="edit-deck-heading">
                <h1>{deck.category}</h1>
                <h3 className="center-text">{deck.title}</h3>
                <p className="color-gray-400 center-text">{deck.description}</p>
            </header>
            
            <div className="card-count-and-card">
                <h2 className="center-text">Card {currentCardIndex + 1}</h2>
                <div className="card-background">
                    <input 
                        className="card-input"
                        type="text"
                        placeholder={isFrontOfCard ? `front card / prompt` : `back card / answer`}
                        value={isFrontOfCard ? frontCard : backCard}
                        onChange={handleCardInput}
                    />
                </div>
            </div>
            
            <div className="under-card">
                <Button label="<" onclick={() => handlePrevButton()} disabled={isPrevDisabled}/>
                <Button 
                    label="Flip Card" 
                    type="neutral"
                    onclick={() => setIsFrontOfCard(!isFrontOfCard)} />
                <Button label=">" onclick={() => handleNextButton()} disabled={isNextDisabled}/>
            </div>
            <div className="list-of-cards">
                {deck.cards.map(card => (
                    <article key={card.id} className="card-list-item">
                        <div  className="card-details">
                        <h4>Card {card.number}</h4>
                            <ul>
                                <li><strong>Front Card:</strong> {card.front}</li>
                                <li><strong>Back Card:</strong> {card.back}</li>
                            </ul>   
                        </div>
                        <Button 
                            label={<img src={TrashCanIcon} alt="Delete" />} 
                            type="transparent"
                            onclick={() => handleDeleteCardButton(card.id)}
                        />
                    </article>
                ))}
            </div>
        </div>
    )
}

export default EditDeck