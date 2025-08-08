export const getDecks = () => {
    try {
        const decks = JSON.parse(localStorage.getItem("decks"));
        return Array.isArray(decks) ? decks : [];
    } catch {
        return [];
    } 
};

export const saveDecks = (decks) => {
    localStorage.setItem("decks", JSON.stringify(decks));
}