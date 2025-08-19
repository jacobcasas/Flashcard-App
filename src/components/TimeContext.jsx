import { createContext, useState, useEffect } from "react";

export const TimerContext = createContext();

export function TimerProvider({ children, minuteGoal = 10 }) {
    const [minutes, setMinutes] = useState(0)

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

    return (
        <TimerContext.Provider value={{ minutes, minuteGoal }}>
            {children}
        </TimerContext.Provider>
    )
}