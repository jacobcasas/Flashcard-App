import './button.css';

function Button({ label, type, onclick }) {

    return (
        <button className={`btn-${type}`} onClick={onclick}>{label}</button>
    )
}

export default Button