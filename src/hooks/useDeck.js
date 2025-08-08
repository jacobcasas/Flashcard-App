import { useState, useEffect } from "react";
import { getDecks, saveDecks } from "../utils/storage";

export const useDeck = deckId => {
    const [deck, setDeck] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    useEffect(() => {
        const decks = getDecks();
        const foundDeck = decks.find(d => d.id === deckId);

        if (foundDeck) {
            if (!Array.isArray(foundDeck.cards)) {
                foundDeck.cards = [];
                const updatedDecks = decks.map(d => d.id === deckId ? foundDeck : d);
                saveDecks(updatedDecks);
            }

            setDeck(foundDeck);

            const savedIndex = parseInt(localStorage.getItem(`editIndex_${deckId}`), 10);
            if (!isNaN(savedIndex)) {
            setCurrentCardIndex(savedIndex);
            } else {
            setCurrentCardIndex(foundDeck.cards.length);
            }

        } else {
            console.warn("Deck not found");
        }
    }, [deckId]);

    return {deck, setDeck, currentCardIndex, setCurrentCardIndex};
}