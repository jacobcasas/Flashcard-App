import js from "@eslint/js";
import { createContext, useState, useEffect } from "react";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
    const [minutes, setMinutes] = useState(() => {
        const storedMinutes = localStorage.getItem('timer');
        return storedMinutes ? JSON.parse(storedMinutes) : 0;
    });

    const minuteGoal = 10;

    useEffect(() => {
        localStorage.setItem('timer', JSON.stringify(minutes));
    }, [minutes]);

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
        if (minutes >= minuteGoal) {
            const todayKey = new Date().toISOString().split('T')[0];

            const progress = JSON.parse(localStorage.getItem("progress") || "{}");
            progress[todayKey] = true;
            localStorage.setItem("progress", JSON.stringify(progress));
        }
    }, [minutes, minuteGoal])

    return (
        <TimerContext.Provider value={{ minutes, setMinutes, minuteGoal }}>
            {children}
        </TimerContext.Provider>
    )
}