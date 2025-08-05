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
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const [isPrevDisabled, setIsPrevDisabled] = useState(false);
    

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

//#region 
    useEffect(() => {
        if (frontCard && backCard !== ''){
            setIsNextDisabled(false);
        } else {
            setIsNextDisabled(true);
        }
    }, [frontCard, backCard, isNextDisabled]);

    useEffect(() => {
        if (currentCardIndex === 0) {
            setIsPrevDisabled(true);
        } else if (currentCardIndex > 0) {
            setIsPrevDisabled(false);
        }
    }, [currentCardIndex, isPrevDisabled]);
//#endregion
    useEffect(() => {
        console.log(currentCardIndex);
    }, [currentCardIndex]);

    //copy the deck and overwrite currentCardIndex with front and back of card
    const handleNextButton = () => {
        const editedCard = {
            id: crypto.randomUUID(),
            number: currentCardIndex + 1,
            front: frontCard,
            back: backCard
        }

        let newCards;

        if (currentCardIndex < deck.cards.length) {
            const editedDeck = [...deck.cards];
            editedDeck[currentCardIndex] = editedCard;

            newCards = editedDeck;

            setDeck(prev => ({
                ...prev,
                cards: editedDeck
            }));
                
        } else {
            const updatedCards = [...deck.cards, editedCard];
            newCards = updatedCards;

            setDeck(prev => ({
                ...prev,
                cards: updatedCards
            }));
                
        };

        const storedDecks = JSON.parse(localStorage.getItem("decks"));

        const updatedDecks = storedDecks.map(d => 
            d.id === deck.id ? { ...d, cards: newCards } : d
        );

        localStorage.setItem("decks", JSON.stringify(updatedDecks));

        setCurrentCardIndex(currentCardIndex + 1);
        setIsFrontOfCard(true);
        setFrontCard('');
        setBackCard('');
    }

    const handlePrevButton = () => {
        setCurrentCardIndex(currentCardIndex - 1);
        setIsFrontOfCard(true);
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
                    <div key={card.id} className="card-details">
                     <h4>Card {card.number}</h4>
                        <ul>
                            <li><strong>Front Card:</strong> {card.front}</li>
                            <li><strong>Back Card:</strong> {card.back}</li>
                        </ul>   
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditDeck