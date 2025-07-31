import '../styles/pages/deckcreation.css';
import Button from '../components/Button/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DeckCreation () {
    const [visibility, setVisibility] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [categoryInput, setCategoryInput] = useState('');
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : {name: "Jacob", age: 26, hobbies: []}
    });

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user]);

    useEffect(() => {
        console.log(user.hobbies);
    }, [user])
    
    const showCategoryCreator = e => {
        e.preventDefault();
        setVisibility(!visibility);
    }

    const toggleDisabled = (e) => {
        const value = e.target.value;
        setCategoryInput(value);
        setIsDisabled(value.trim().length === 0);
    };

    const createNewCategory = (e) => {
        e.preventDefault();
        if (categoryInput.trim() === '') return;

        setUser(prev => ({
            ...prev,
            hobbies: [...prev.hobbies, categoryInput.trim()]
        }));

        setCategoryInput('');
        setIsDisabled(true);
    };

    return (
        <>
            <div className="page-container">
                <h1 className='color-gray-50'>Create A Deck</h1>
                <form className='create-deck-form'>
                    <div className="form-element">
                        <label htmlFor="category">Category</label>
                        <Button label="+" type="add" onclick={(e) => createCategoryBtnTest(e)}/>
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
                </form>
            </div>
        </>
    )
}

export default DeckCreation