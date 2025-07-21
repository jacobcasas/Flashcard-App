import '../styles/pages/dashboard.css';


function Dashboard () {
    const user = "jake";
    const today = new Date().getDay();

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
                </div>
            </div>
        </>
    )
}

export default Dashboard