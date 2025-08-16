import '../styles/pages/dashboard.css';
import Button from '../components/Button/Button';
import DeckCard from '../components/DeckCard/DeckCard';
import SetUser from './SetUser';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Dashboard () {
    const today = new Date().getDay();
    
    const getCategory = localStorage.getItem("categories");
    const getDeck = localStorage.getItem("decks");
    const categoryHeading = JSON.parse(getCategory || "[]");
    const deckCardDisplay = JSON.parse(getDeck || "[]");
    const getUser = JSON.parse(localStorage.getItem("user") || "{}");

    
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isScrollable, setIsScrollable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const [minutes, setMinutes] = useState(() => {
        const storedTimer = localStorage.getItem("timer");
        return storedTimer ? JSON.parse(storedTimer) : 0;
    });
    const [minuteGoal, setMinuteGoal] = useState(10);
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme ? JSON.parse(storedTheme) : "true";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);


    useEffect(() => {
        if (!isScrollable) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        }
    }, [isScrollable]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMinutes(prev => {
                if (prev + 1 >= minuteGoal) {
                    clearInterval(interval);
                    return minuteGoal;
                }
                return prev + 1;
            });
        }, 60_000);

        return () => clearInterval(interval);
    }, [minuteGoal]);

    useEffect(() => {
        localStorage.setItem("timer", minutes);
    }, [minutes])

    const dayAndMarker = [
        {
            id: 0,
            day: "S"
        },
        {
            id: 1,
            day: "M"
        },
        {
            id: 2,
            day: "T"
        },
        {
            id: 3,
            day: "W"
        },
        {
            id: 4,
            day: "Th"
        },
        {
            id: 5,
            day: "F"
        },
        {
            id: 6,
            day: "S"
        }
    ];
//#region functions
    const handleDeckSelection = (deck) => {
        setSelectedDeck(deck);
        setIsScrollable(false);
        if (deck.cards.length === 0) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    };

    const handleCategorySelection = (cat) => {
        setSelectedCategory(cat);
        setIsScrollable(false);
    }
 
    const handleCloseDeckSelection = () => {
        setSelectedDeck(null);
        setSelectedCategory(null);
        setIsScrollable(true);
    };

    const handleDeleteDeck = (deckId) => {
        const filteredDecks = deckCardDisplay.filter(deck => deck.id !== deckId);

        localStorage.setItem("decks", JSON.stringify(filteredDecks));

        handleCloseDeckSelection();
    }

    const handleDeleteCategory = (catId) => {
        const filteredCategories = categoryHeading.filter(cat => cat !== catId);
        localStorage.setItem("categories", JSON.stringify(filteredCategories));

        handleCloseDeckSelection();
    }

    const toggleTheme = () => {
        setTheme(!theme);

        if (theme) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }

    const removeTimerTest = () => {
        localStorage.removeItem("timer");
        location.reload();
    }
//#endregion
    if (getUser.name === "") {
        return <SetUser />
    } else {
        return (
            <div className="page-container">
                <div className="hero-section">
                    <Button 
                        label={ theme 
                                ? <img src="src/assets/light_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg" /> 
                                : <img src="src/assets/dark_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg" />
                            }
                        type="theme-switcher"
                        onclick={() => toggleTheme()}
                    />

                    <div className="greeting">
                        <p className="indexed | bold"><i>Indexed</i></p>
                        <h2 className='color-gray-400'>welcome back, <br /><span className='username | color-gray-50'>{getUser.name}</span></h2>
                    </div>

                    <div className="tracker-and-msg">
                        <div className='weekly-tracker-container'>
                        {dayAndMarker.map((item, index) => {
                            const isToday = item.id === today;
                            const isComplete = true; //placeholder logic
                            let streakLevel;
                            if (isToday && isComplete) {
                                streakLevel = "2";
                            } else if (item.id < today && isComplete) {
                                streakLevel = "1";
                            } else streakLevel = "0";

                            return (
                                <div className="day-and-marker">
                                    <p key={index}>{item.day}</p>
                                    <div className={`marker mkr-${streakLevel} ${isToday ? 'today' : ''}`}></div>
                                </div>
                            );
                        })}
                        </div>
                        <p className='streak-msg'>You're on a <span className='color-success'><i>1 week</i></span> streak. Keep it up!</p>
                    </div>

                    <div className="goal-info-deck">
                        <div className="goal-category">
                            <p>Mastered <br />Cards</p>
                            <p className="sm-text color-gray-200">0</p>
                        </div>
                        <div className="goal-category">
                            <p>Mins Studied</p>
                            <p className={`sm-text ${minutes === minuteGoal ? 'color-success' : 'color-gray-200'}`}>{minutes}m/{minuteGoal}m</p>
                        </div>
                        <div className="goal-category">
                            <p>PB %</p>
                            <p className="sm-text color-gray-200">80%</p>
                        </div>
                    </div>
                </div>

                <div className="deck-section">
                    <h2 className="color-gray-50">Your Decks</h2>
                    <div className="deck-category-container">
                        {categoryHeading.length === 0 ? (
                            <p>You have no decks, click on the button to create one.</p>
                        ) : (
                            categoryHeading.map(cat => {
                                const decksInCategories = deckCardDisplay.filter(deck => deck.category === cat);
                            
                                if (decksInCategories.length > 0) {
                                    return (
                                        <div key={cat} className='deck-category'>
                                            <div className="heading-and-delete-category">
                                               <h3>{cat}</h3> 
                                            </div>
                                            <div className='deck-row'>
                                            {decksInCategories.map(deck => (
                                                    <DeckCard
                                                        key={deck.id}
                                                        deckTitle={deck.title}
                                                        description={deck.description}
                                                        count={`${deck.cards.length} cards`}
                                                        onclick={() => handleDeckSelection(deck)}
                                                    />
                                            ))}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={cat} className='deck-category'>
                                            <div className="heading-and-delete-category">
                                               <h3>{cat}</h3> 
                                               <Button 
                                                    label={<img src="/src/assets/trash-can.svg" />}
                                                    type="transparent"
                                                    onclick={() => handleCategorySelection(cat)}
                                                />
                                            </div>
                                            
                                            <p> You dont have any cards in {cat}. Click the "add new" to make a deck.</p>
                                        </div>
                                    )
                                }
                            })
                        )}
                        <Link to="/deckcreation">
                            <Button label="add new" type="confirm" />
                        </Link>
                    </div>
                    

                    {selectedDeck && (
                        <div className="popup-background">
                            <div className="edit-deck-popup">
                                <Button label="X" type="close" onclick={() => handleCloseDeckSelection()}/>
                                <h2>{selectedDeck.title}</h2>
                                <p>{selectedDeck.description}</p>
                                <div className="popup-buttons">
                                    <Link to={`/editdeck/${selectedDeck.id}`}>
                                        <Button label="edit" type="neutral"/>
                                    </Link>
                                    <Link to={`/studysession/${selectedDeck.id}`}>
                                        <Button 
                                            label="study" 
                                            type="neutral" 
                                            disabled={isDisabled}
                                        />
                                    </Link>
                                </div>
                                <Button 
                                    label="Delete" 
                                    type="attention" 
                                    onclick={() => handleDeleteDeck(selectedDeck.id)}
                                />
                            </div>
                        </div>
                    )}

                    {selectedCategory && (
                        <div className="popup-background">
                            <div className="edit-deck-popup">
                                <Button label="X" type="close" onclick={() => handleCloseDeckSelection()}/>
                                <h3>Delete {selectedCategory}?</h3>
                                <Button 
                                    label="Delete"
                                    type="attention"
                                    onclick={() => handleDeleteCategory(selectedCategory)}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="session-history-section">
                        <h2>Study Session History</h2>
                        <Button 
                            label="reset timer"
                            type="attention"
                            onclick={() => removeTimerTest()}
                        />
                </div>
            </div>
        )
    }
    
}

export default Dashboard