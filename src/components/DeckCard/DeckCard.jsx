import './deckcard.css';

function DeckCard ({ deckTitle, description, count, onclick }) {

    return (
        <div className="deck-card" onClick={onclick}>
            <h4>{deckTitle}</h4>
            <p className='deck-description | color-gray-200'>{description}</p>
            <p className="sm-text color-neutral">{count}</p>
        </div>
    );

}

export default DeckCard