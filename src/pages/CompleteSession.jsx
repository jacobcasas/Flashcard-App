import { Link } from 'react-router-dom';
import Button from '../components/Button/Button'
import '../styles/pages/completesession.css'

function CompleteSession({ score, incorrect }) {
    return (
        <div className="page-container">
            <div className="heading-and-score">
                <h5>Results</h5>
                <div className="quiz-results">
                    <h2>You Scored:</h2>
                    <p>{score}</p>
                </div>
            </div>
            
            <div className="incorrect-cards">
                {incorrect}
            </div>
            <div className="session-link-buttons">
                <Button label="Try again" type="neutral" onclick={() => location.reload()}/>
                <Link to='/'>
                    <Button label="Dashboard" type="neutral"/>
                </Link>
            </div>

        </div>

        
    )
}

export default CompleteSession