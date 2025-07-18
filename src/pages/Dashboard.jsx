import '../styles/pages/dashboard.css';

function Dashboard () {
    const user = "jake";
    return (
        <>
            <div className="page-container">
                <div className="hero-section">
                    <p className="indexed | bold"><i>Indexed</i></p>
                    <h2 className='color-gray-400'>welcome back, <span className='username | color-gray-50'>{user}</span></h2>
                    <div className="week-tracker-container"></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard