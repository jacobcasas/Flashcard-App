import { useEffect, useState } from "react";
import Button from "../components/Button/Button"
import '../styles/pages/editdeck.css'
import { useParams } from "react-router-dom";

function EditDeck () {

    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [frontCard, setFrontCard] = useState('');
    const [backCard, setBackCard] = useState('');
    

    useEffect(() => {
        const storedDecks = localStorage.getItem("decks");
        const parsedDecks = JSON.parse(storedDecks);

        const foundDeck = parsedDecks.find(d => d.id === deckId);

        setDeck(foundDeck);
    }, [deckId]);

    const createCard = (e) => {
        e.preventDefault();

        const newCard = {
            front: frontCard,
            back: backCard
        }

        const updatedCards = [...deck.cards, newCard];

        setDeck(prev => ({
            ...prev,
            cards: updatedCards
        }));
        setFrontCard('');
        setBackCard('');
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
                    placeholder="front side / the prompt"
                    value={frontCard}
                />
            </div>
            <div className="under-card">
                <Button label="<" />
                <Button label="Flip Card" type="neutral" />
                <Button label=">" />
            </div>
        </div>
    )
}

export default EditDeck