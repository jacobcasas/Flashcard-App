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
            <p className="sm-text color-gray-200">{timeElapsed === 0 ? `just now` : `${timeElapsed}m ago`}</p>
        </div>
    )
}

export default TestResult