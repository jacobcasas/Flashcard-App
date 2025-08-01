import Button from "../components/Button/Button"
import '../styles/pages/editdeck.css'

function EditDeck () {
    
    return (
        <div className="page-container">
            <h1>Deck Name</h1>
            <p className="center-text">This is a deck description</p>
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