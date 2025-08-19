import '../styles/pages/dashboard.css';
import Button from '../components/Button/Button';
import DeckCard from '../components/DeckCard/DeckCard';
import SetUser from './SetUser';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TestResult from '../components/TestResult/TestResult';
import TrashIcon from "../assets/trash-can.svg";
import LightIcon from "../assets/light_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg";
import DarkIcon from "../assets/dark_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg";


function Dashboard () {
    const today = new Date().getDay();
    
    
    const getCategory = localStorage.getItem("categories");
    const getDeck = localStorage.getItem("decks");
    const categoryHeading = JSON.parse(getCategory || "[]");
    const deckCardDisplay = JSON.parse(getDeck || "[]");
    const getUser = JSON.parse(localStorage.getItem("user") || "{}");

    const isToday = new Date().toISOString().split("T")[0];
    const masteredToday = deckCardDisplay.flatMap(deck => deck.cards).filter(card => card.masteredOn === isToday).length
    
    
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isScrollable, setIsScrollable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const [results, setResults] = useState(() => {
        const storedResults = localStorage.getItem("results");
        return storedResults ? JSON.parse(storedResults) : [];
    })
    const [minutes, setMinutes] = useState(() => {
        const storedTimer = localStorage.getItem("timer");
        return storedTimer ? JSON.parse(storedTimer) : 0;
    });
    const [minuteGoal, setMinuteGoal] = useState(10);
    const [theme, setTheme] = useState("");

    const topPercentage = results.length > 0 
        ? Math.max(...results.map(result => result.percentage))
        : 0;

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (results.length > 5) {
            setResults(prev => prev.slice(-5));
        }
    }, [results])

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme)
    }, [theme]);

    useEffect(() => {
        const now = new Date();
        const msToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) - now;

        const timeout = setTimeout(() => {
            resetGoalDeck();

            setInterval(resetGoalDeck, 24 * 60 * 60 * 1000);
        }, msToMidnight);

        return () => clearTimeout(timeout);
    }, [])


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
    const resetGoalDeck = () => {
        localStorage.removeItem("timer");
        localStorage.removeItem("results");
        
        const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");

        const resetDecks = storedDecks.map(deck => ({
            ...deck,
            cards: deck.cards.map(card => ({
                ...card,
                masteredOn: null
            }))
        }))

        localStorage.setItem("decks", JSON.stringify(resetDecks));
    }

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

//#endregion
    if (getUser.name === "") {
        return <SetUser />
    } else {
        return (
            <div className="page-container">
                <div className="hero-section">
                    <Button 
                        label={ theme === "light"
                                ? <img src={DarkIcon} alt='Moon' /> 
                                : <img src={LightIcon} alt='Sun' />
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
                            const isComplete = minutes === minuteGoal;
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
                    </div>

                    <div className="goal-info-deck">
                        <div className="goal-category">
                            <p>Mastered <br />Cards</p>
                            <p className="sm-text color-gray-200">{masteredToday}</p>
                        </div>
                        <div className="goal-category">
                            <p>Mins Studied</p>
                            <p className={`sm-text ${minutes === minuteGoal ? 'color-success' : 'color-gray-200'}`}>{minutes}m/{minuteGoal}m</p>
                        </div>
                        <div className="goal-category">
                            <p>PB %</p>
                            <p className="sm-text color-gray-200">{topPercentage}%</p>
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
                                                    label={<img src={TrashIcon} alt='Delete' />}
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
                        {results.length === 0 ? (
                            <p>You currently have no results recorded. Study a deck to see results.</p>
                        ) : (
                            results.map(result => (
                                <TestResult key={result.id} result={result}/>
                            ))
                        )}

                </div>
            </div>
        )
    }
    
}

export default Dashboard