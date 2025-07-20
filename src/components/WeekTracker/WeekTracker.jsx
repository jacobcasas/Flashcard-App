import { useState } from 'react';
import './weektracker.css';

// this week tracker needs to 
//  1) always start on sunday and end monday
//  2) fill the elipses on the days you already set to your streak 
//  3) fill and checkmark the current day if users goals are completed
function WeekTracker () {
    const today = 4;

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
    );
}

export default WeekTracker