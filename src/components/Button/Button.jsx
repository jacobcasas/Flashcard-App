import './button.css';

function Button({ label, type }) {

    return (
        <button className={`btn-${type}`}>{label}</button>
    )
}

export default Button