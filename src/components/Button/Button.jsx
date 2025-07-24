import './button.css';

function Button({ label, type, onclick, disabled}) {

    return (
        <button className={`btn-${type}`} onClick={onclick} disabled={disabled}>{label}</button>
    )
}

export default Button