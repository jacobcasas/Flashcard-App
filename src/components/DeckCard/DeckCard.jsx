import './deckcard.css';

function DeckCard ({ deckTitle, description, count }) {

    return (
        <div className="deck-card">
            <h4>{deckTitle}</h4>
            <p className='deck-description | color-gray-200'>{description}</p>
            <p className="sm-text color-neutral">{count}</p>
        </div>
    );

}

export default DeckCard