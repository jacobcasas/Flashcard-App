import { useState } from "react";
import Button from "../components/Button/Button";

function SetUser({ onSetUser }) {
    const [nameInput, setNameInput] = useState("");

    const handleSetName = () => {
        const newUser = { name: nameInput}
        localStorage.setItem('user', JSON.stringify(newUser));
        onSetUser(newUser);
    }

    return (
        <div className="page-container">
            <h1>Welcome To Indexed</h1>
            <div className="username-input-prompt">
                <h4>Please enter your first name</h4>
                <input 
                    type="text"
                    placeholder="First Name"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    required
                />
            </div>
            <Button label="Contiue to Dashboard" type="success" onclick={() => handleSetName()}/>
        </div>
    )
}

export default SetUser