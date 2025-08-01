import Button from "../components/Button/Button"

function EditDeck () {
    
    return (
        <div className="page-container">
            <h1>Deck Name</h1>
            <p className="deck-description">This is a deck description</p>
            <div className="card-background">
                <input 
                    type="text"
                    placeholder="front side"
                />
            </div>
            <div className="under-card">
                <Button label="<" />
                <Button label="flip card" type="neutral" />
                <Button label=">" />
            </div>
        </div>
    )
}

export default EditDeck