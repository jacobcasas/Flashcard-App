import '../styles/pages/deckcreation.css';
import Button from '../components/Button/Button';
import { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DeckCreation () {
    const [visibility, setVisibility] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [categoryInput, setCategoryInput] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryList, setCategoryList] = useState(() => {
        const storedCategories = localStorage.getItem("categories");
        return storedCategories ? JSON.parse(storedCategories) : [];
    });
    const [deckList, setDeckList] = useState(()=> {
        const storedDecks = localStorage.getItem("decks");
        return storedDecks ? JSON.parse(storedDecks) : [];
    });

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categoryList));
        localStorage.setItem("decks", JSON.stringify(deckList));
    }, [categoryList, deckList]);

    useEffect(() => {
        console.log(categoryList, deckList);
    }, [categoryList, deckList]);

    const createNewCategory = (e) => {
        e.preventDefault();
        if (categoryInput.trim() === "") return;

        setCategoryList(prev => [...prev, categoryInput.trim()])

        setCategoryInput("");
        setIsDisabled(true);
    }

    const createNewDeck = (e) => {
        e.preventDefault();

        const newDeck = {
            id: crypto.randomUUID(),
            category: selectedCategory,
            title: titleInput,
            description: descriptionInput
        };

        setDeckList(prev => [...prev, newDeck]);

        setTitleInput('');
        setDescriptionInput('');
        setSelectedCategory('');
    }



    const handleCategoryInput = (e) => {
        const value = e.target.value;
        setCategoryInput(value);
        setIsDisabled(value.trim().length === 0)
    }

    return (
        <>
            <div className="page-container">
                <h1 className='color-gray-50'>Create A Deck</h1>
                <form className='create-deck-form'>
                    <div className="form-element">
                        <label htmlFor="category">Category</label>
                        <div className="category-buttons-container">
                            {categoryList.map(category => (
                                <Button 
                                    key={category}
                                    label={category}
                                    type={category === selectedCategory ? "attention" : "neutral"}
                                    value={category}
                                    onclick={e => {
                                        e.preventDefault();
                                        setSelectedCategory(category);
                                    }}   
                                />
                            ))}
                            <Button 
                                label="+"  
                                type="add" 
                                onclick={(e) => {
                                    e.preventDefault();
                                    setVisibility(!visibility);
                                }}
                            />
                        </div>
                        
                        <div className={`create-category ${!visibility ? 'hidden' : ''}`}>
                            <label htmlFor="category-list">Create a new category</label>
                            <div className="cc-input-and-button">
                                <input
                                 name='category-list' 
                                 type="text" 
                                 placeholder='i.e. "Language"' 
                                 value={categoryInput}
                                 onChange={handleCategoryInput}
                                 />
                                <Button
                                 label="➔" 
                                 type="append" 
                                 disabled={isDisabled}
                                 onclick={createNewCategory}
                                />
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
                         value={titleInput}
                         onChange={e => setTitleInput(e.target.value)}
                          />
                    </div>
                    <div className="form-element">
                        <label htmlFor="description">Desciption</label>
                        <textarea
                         name="desciption" 
                         id="deck-description"
                         placeholder='Why are you making this deck? i.e. "For the test Friday"'
                         rows= "5"
                         value={descriptionInput} 
                         onChange={e => setDescriptionInput(e.target.value)}>
                        </textarea>
                    </div>
                </form>
                <Button 
                    label="Create Deck"
                    type="success"
                    onclick={createNewDeck}
                />
                <Link to="/">
                    <Button label="Dashboard" />
                </Link>
            </div>
        </>
    )
}

export default DeckCreation