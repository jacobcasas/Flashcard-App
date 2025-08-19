import { useEffect, useState } from 'react';
import './testresult.css'

function TestResult({ result }) {
    const [timeElapsed, setTimeElapsed] = useState(() => {
        return Math.floor((Date.now() - result.createdAt) / 60000);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(Math.floor((Date.now() - result.createdAt) / 60000));
        }, 60_000);

        return () => clearInterval(interval);
    }, [result.createdAt]);

    return (
        <div className="test-result-container">
            <h3><strong>{result.title}</strong></h3>
            <p><strong>Score:</strong> {result.score}</p>
            {timeElapsed === 0 ? (
                <p className="sm-text color-gray-400">just now</p>
            ) : timeElapsed < 60 ? (
                <p className="sm-text color-gray-400">{timeElapsed}m ago</p>
            ) : (
                <p className="sm-text color-gray-400">{Math.floor(timeElapsed / 60)}h ago</p>
            )}
        </div>
    )
}

export default TestResult