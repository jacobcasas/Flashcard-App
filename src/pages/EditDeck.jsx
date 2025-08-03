import { useEffect, useState } from "react";
import Button from "../components/Button/Button"
import '../styles/pages/editdeck.css'
import { useParams } from "react-router-dom";

function EditDeck () {

    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [frontCard, setFrontCard] = useState('');
    const [backCard, setBackCard] = useState('');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFrontOfCard, setIsFrontOfCard] = useState(true);
    

    useEffect(() => {
        const storedDecks = localStorage.getItem("decks");
        const parsedDecks = JSON.parse(storedDecks);

        const foundDeck = parsedDecks.find(d => d.id === deckId);

        if (foundDeck) {
            if (!Array.isArray(foundDeck.cards)) {
                foundDeck.cards = [];
                const updatedDecks = parsedDecks.map(d => d.id === deckId ? foundDeck : d);
                localStorage.setItem("decks", JSON.stringify(updatedDecks));
            }
            setDeck(foundDeck);
        } else {
            console.warn("Deck not found", foundDeck);
        }

        console.log("deckId:", deckId);
        console.log("parsedDecks:", parsedDecks);

    }, [deckId]);

    useEffect(() => {
        if (deck && currentCardIndex < deck.cards.length) {
            const currentCard = deck.cards[currentCardIndex];
            setFrontCard(currentCard.front);
            setBackCard(currentCard.back);
        } else {
            setFrontCard('');
            setBackCard('');
        }

    }, [currentCardIndex, deck]);

    //copy the deck and overwrite currentCardIndex with front and back of card
    const handleNextButton = (e) => {
        const editedCard = {
            front: frontCard,
            back: backCard
        }

        if (currentCardIndex < deck.cards.length) {
            const editedDeck = [...deck.cards];
            editedDeck[currentCardIndex] = editedCard;

            setDeck(prev => ({
                ...prev,
                cards: editedDeck
            }));
        } else {
            const updatedCards = [...deck.cards, editedCard];

            setDeck(prev => ({
                ...prev,
                cards: updatedCards
            }));
        };

        setFrontCard('');
        setBackCard('');
        setCurrentCardIndex(currentCardIndex + 1);
    }

    const handleCardInput = (e) => {
        const value = e.target.value;
        if (isFrontOfCard) {
            setFrontCard(value);
        } else {
            setBackCard(value);
        }
    }
    
    if (!deck) return <p className="center-text">Deck not found...</p>;

    return (
        <div className="page-container">
            <h1>{deck.category} - {deck.title}</h1>
            <h5 className="center-text">{deck.description}</h5>
            <div className="card-background">
                <input 
                    className="card-input"
                    type="text"
                    placeholder={isFrontOfCard ? `front card / prompt` : `back card / answer`}
                    value={isFrontOfCard ? frontCard : backCard}
                    onChange={handleCardInput}
                />
            </div>
            <div className="under-card">
                <Button label="<" />
                <Button 
                    label="Flip Card" 
                    type="neutral"
                    onclick={() => setIsFrontOfCard(!isFrontOfCard)} />
                <Button label=">" onclick={() => handleNextButton}/>
            </div>
        </div>
    )
}

export default EditDeck