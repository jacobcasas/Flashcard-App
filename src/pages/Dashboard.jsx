import '../styles/pages/dashboard.css';
import Button from '../components/Button/Button';
import DeckCard from '../components/DeckCard/DeckCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Dashboard () {
    const user = "jake";
    const today = new Date().getDay();
    
    const getCategory = localStorage.getItem("categories");
    const getDeck = localStorage.getItem("decks");
    const categoryHeading = JSON.parse(getCategory || "[]");
    const deckCardDisplay = JSON.parse(getDeck || "[]");

    const [selectedDeck, setSelectedDeck] = useState(null);
    const [isScrollable, setIsScrollable] = useState(true);

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

    const handleDeckSelection = (deck) => {
        setSelectedDeck(deck);
        setIsScrollable(false);
    };

    const handleCloseDeckSelection = () => {
        setSelectedDeck(null);
        setIsScrollable(true);
    };

    return (
        <>
            <div className="page-container">
                <div className="hero-section">
                    <div className="greeting">
                        <p className="indexed | bold"><i>Indexed</i></p>
                        <h2 className='color-gray-400'>welcome back, <br /><span className='username | color-gray-50'>{user}</span></h2>
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
                            <p>focus</p>
                            <p className="sm-text">"Math"</p>
                        </div>
                        <div className="goal-category">
                            <p>time/goal</p>
                            <p className="sm-text">5m/10m</p>
                        </div>
                        <div className="goal-category">
                            <p>PB</p>
                            <p className="sm-text">18/20</p>
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
                                            <h3>{cat}</h3>
                                            <div className='deck-row'>
                                            {decksInCategories.map(deck => (
                                                    <DeckCard
                                                        key={deck.id}
                                                        deckTitle={deck.title}
                                                        description={deck.description}
                                                        count="24 count"
                                                        onclick={() => handleDeckSelection(deck)}
                                                    />
                                            ))}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={cat} className='deck-category'>
                                            <h3>{cat}</h3>
                                            <p>You dont have any cards in {cat}. Click the button to make a deck.</p>
                                        </div>
                                    )
                                }
                            })
                       )}
                    </div>
                    <Link to="/deckcreation">
                        <Button label="add new" type="confirm" />
                    </Link>

                    {selectedDeck && (
                        <div className="popup-background">
                            <div className="edit-deck-popup">
                                <h2>{selectedDeck.title}</h2>
                                <p>{selectedDeck.description}</p>
                                <div className="popup-buttons">
                                    <Link to="/editdeck">
                                        <Button label="edit" type="neutral"/>
                                    </Link>
                                    <Button label="study" />
                                </div>
                                <Button 
                                    label="close" 
                                    type="attention" 
                                    onclick={() => handleCloseDeckSelection()}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard