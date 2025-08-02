import { useEffect, useState } from "react";
import Button from "../components/Button/Button"
import '../styles/pages/editdeck.css'
import { useParams } from "react-router-dom";

function EditDeck () {

    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        const storedDecks = localStorage.getItem("decks");
        const parsedDecks = JSON.parse(storedDecks);

        const foundDeck = parsedDecks.find(d => d.id === deckId);

        setDeck(foundDeck);
    }, [deckId]);

    if (!deck) return <p className="center-text">Deck not found...</p>;

    return (
        <div className="page-container">
            <h1>{deck.category} - {deck.title}</h1>
            <p className="center-text">{deck.description}</p>
            <div className="card-background">
                <input 
                    className="card-input"
                    type="text"
                    placeholder="front side"
                />
            </div>
            <div className="under-card">
                <Button label="<" />
                <Button label="flip card / your question" type="neutral" />
                <Button label=">" />
            </div>
        </div>
    )
}

export default EditDeck