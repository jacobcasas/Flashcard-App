import '../styles/pages/deckcreation.css';
import Button from '../components/Button/Button';
import { useState } from 'react';

function DeckCreation () {
    const [visibility, setVisibility] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    
    
    const createCategoryBtnTest = e => {
        e.preventDefault();
        setVisibility(!visibility);
    }

    const toggleDisabled = () => {
        const categoryInput = document.getElementById('name-category');
        if (categoryInput.value.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    const appendNewCategory = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="page-container">
                <h1 className='color-gray-50'>Create A Deck</h1>
                <form action="" className='create-deck-form'>
                    <div className="form-element">
                        <label htmlFor="category">Category</label>
                        <Button label="+" type="add" onclick={(e) => createCategoryBtnTest(e)}/>
                        <div className={`create-category ${!visibility ? 'hidden' : ''}`}>
                            <label htmlFor="category-list">Create a new category</label>
                            <div className="cc-input-and-button">
                                <input id='name-category' name='category-list' type="text" placeholder='i.e. "Language"' onChange={toggleDisabled}/>
                                <Button label="Add" type="append" onclick={(e) => appendNewCategory(e)} disabled={isDisabled}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-element">
                        <label htmlFor="title">Title</label>
                        <input
                         type="text" 
                         name="title" 
                         id="deck-title" 
                         placeholder='What did you want to study? i.e. "Spanish"'
                          />
                    </div>
                    <div className="form-element">
                        <label htmlFor="description">Desciption</label>
                        <textarea
                         name="desciption" 
                         id="deck-description"
                         placeholder='Why are you making this deck? i.e. "For the test Friday"'></textarea>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DeckCreation