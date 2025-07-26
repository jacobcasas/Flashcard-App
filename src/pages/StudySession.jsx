import Button from "../components/Button/Button";
import { Link } from "react-router-dom";

function StudySession () {
    const testDeckDisplay = localStorage.getItem("decks");
    const deckList = JSON.parse(testDeckDisplay);

    return (
        <div className="page-container">
            {deckList.map(deck => (
                <div key={deck.id}>
                    <h3>{deck.category}</h3>
                    <p>{deck.title}</p>
                    <p>{deck.description}</p>
                </div>
            ))}
            
            <Link to="/deckcreation">
                <Button label="Back to Deck Creation" />
            </Link>
            
        </div>
    );
}

export default StudySession