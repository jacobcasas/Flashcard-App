import './button.css';

function Button({ label, type, onclick, disabled, value, submit}) {

    return (
        <button 
        className={`btn-${type}`}
        onClick={onclick} 
        disabled={disabled} 
        value={value}
        onSubmit={submit}>
            {label}
        </button>
    )
}

export default Button