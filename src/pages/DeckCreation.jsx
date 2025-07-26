import '../styles/pages/deckcreation.css';
import Button from '../components/Button/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DeckCreation () {
    const [visibility, setVisibility] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [categoryInput, setCategoryInput] = useState('');
    const [titleInput,setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState(() => {
        const storedCategories = localStorage.getItem("categories");
        return storedCategories 
            ? JSON.parse(storedCategories) 
            : {
                categoryList: []
            }
    });

    const [deckDetails, setDeckDetails] = useState(() => {
        const storedDetails = localStorage.getItem("details");
        return storedDetails
            ? JSON.parse(storedDetails)
            : {
                category: "okie",
                deckTitle: "nice",
                deckDescription: "okeeee"
            }
    })

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
        localStorage.setItem("details", JSON.stringify(deckDetails))
    }, [categories, deckDetails]);

    useEffect(() => {
        console.log(categories, deckDetails);
    }, [categories, deckDetails])
    
    const showCategoryCreator = e => {
        e.preventDefault();
        setVisibility(!visibility);
    }

    const selectCategory = (e) => {
        e.preventDefault();
        setSelectedCategory();
    }

    const toggleDisabled = (e) => {
        const value = e.target.value;
        setCategoryInput(value);
        setIsDisabled(value.trim().length === 0);
    };

    const createNewCategory = (e) => {
        e.preventDefault();
        if (categoryInput.trim() === '') return;

        setCategories(prev => ({
            ...prev,
            categoryList: [...prev.categoryList, categoryInput.trim()]
        }));

        setCategoryInput('');
        setIsDisabled(true);
    };

    const createNewDeck = (e) => {
        e.preventDefault();
        if (titleInput.trim() === '' && descriptionInput.trim() === '') return;

        setDeckDetails(() => ({
            category: {selectedCategory},
            deckTitle: {titleInput},
            deckDescription: {descriptionInput}
        }));
    };


    const removeCategoriesTest = () => {
        localStorage.removeItem("categories");
    }

    return (
        <>
            <div className="page-container">
                <h1 className='color-gray-50'>Create A Deck</h1>
                <form className='create-deck-form'>
                    <div className="form-element">
                        <label htmlFor="category">Category</label>
                        <div className="category-buttons-container">
                            {categories.categoryList.map(el => {
                                return <Button label={el} type={el === selectedCategory ? `attention` : `neutral`} value={el} onclick={e => {
                                    e.preventDefault();
                                    setSelectedCategory(el);
                                }}/>
                            })}
                            <Button label="+" type="add" onclick={(e) => showCategoryCreator(e)}/>
                        </div>
                        <div className={`create-category ${!visibility ? 'hidden' : ''}`}>
                            <label htmlFor="category-list">Create a new category</label>
                            <div className="cc-input-and-button">
                                <input
                                 name='category-list' 
                                 type="text" 
                                 placeholder='i.e. "Language"' 
                                 value={categoryInput}
                                 onChange={toggleDisabled}
                                 />
                                <Button
                                 label="➔" 
                                 type="append" 
                                 onclick={createNewCategory} 
                                 disabled={isDisabled}
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

                    <Button 
                        label="Create Deck"
                        type="confirm"
                        onclick={createNewDeck}
                    />

                    <Link to="/">
                        <Button label="Go Home" type="neutral" />
                    </Link>
                    
                     
                </form>
            </div>
        </>
    )
}

export default DeckCreation