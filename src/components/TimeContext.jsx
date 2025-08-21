import { createContext, useState, useEffect } from "react";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
    const [minutes, setMinutes] = useState(() => {
        const storedMinutes = localStorage.getItem('timer');
        return storedMinutes ? JSON.parse(storedMinutes) : 0;
    });
    const [results, setResults] = useState(() => {
        const storedResults = localStorage.getItem("results");
        return storedResults ? JSON.parse(storedResults) : [];
    });
    const [progress, setProgress] = useState(() => {
        return JSON.parse(localStorage.getItem("progress") || "{}");
    })

    const minuteGoal = 10;

    const resetAllGoals = () => {
        localStorage.removeItem("timer");
        localStorage.removeItem("results");
        
        let storedDecks = [];
        try { 
            storedDecks = JSON.parse(localStorage.getItem("decks")) || [];
        } catch {
            storedDecks = [];
        }

        const resetDecks = storedDecks.map(deck => ({
            ...deck,
            cards: deck.cards.map(card => ({
                ...card,
                masteredOn: null
            }))
        }))

        localStorage.setItem("decks", JSON.stringify(resetDecks));

        setMinutes(0);
        setResults([]);
    }

    useEffect(() => {
        const todayKey = new Date().toISOString().split("T")[0];
        const lastReset = localStorage.getItem("lastReset");

        if (lastReset !== todayKey) {
            resetAllGoals();

            localStorage.setItem("lastReset", todayKey);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('timer', JSON.stringify(minutes));
    }, [minutes]);

    useEffect(() => {
        if (minutes >= minuteGoal) return;

        const interval = setInterval(() => {
            setMinutes(prev => Math.min(prev + 1, minuteGoal));
        }, 60_000);

        return () => clearInterval(interval)
    }, [minutes, minuteGoal]);

    useEffect(() => {
        if (minutes >= minuteGoal) {
            const todayKey = new Date().toISOString().split('T')[0];

            setProgress(prev => {
                const updated = { ...prev, [todayKey]: true };
                localStorage.setItem("progress", JSON.stringify(updated));
                return updated;
            })
        }
    }, [minutes, minuteGoal]);


    return (
        <TimerContext.Provider value={{ minutes, setMinutes, progress, setProgress, results, setResults, resetAllGoals }}>
            {children}
        </TimerContext.Provider>
    )
}