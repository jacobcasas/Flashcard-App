import Button from "../components/Button/Button";
import { Link } from "react-router-dom";

function StudySession () {
    const testCategory = localStorage.getItem("categories")
    const testDeckDisplay = localStorage.getItem("decks");
    const categoryDisplay = JSON.parse(testCategory)
    const deckDisplay = JSON.parse(testDeckDisplay);

    return (
        <div className="page-container">
            {categoryDisplay.map(cat => (
                <div>
                    <h2 key={cat}>{cat}</h2>
                    {deckDisplay.map(deck => {
                        if (deck.category === cat) {
                            return (
                                <div className={deck.id}>
                                    <h4>{deck.title}</h4>
                                    <p>{deck.description}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            ))}

            <Link to="/deckcreation">
                <Button label="Back to Deck Creation" />
            </Link>
            
        </div>
    );
}

export default StudySession