import { useState } from "react";
import Button from "../Button";
import Input from "../Input";


const SignupPage = () => {

    const [formInputs, setFormInputs] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChangeInputValue = e => {
        setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        console.log("-- submit");
    }
    return (
        <div className="signup signup-wrapper">
            <div className="signup-container">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmitForm}>
                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Ivan"
                        value={formInputs.name}
                        onChange={handleChangeInputValue}
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="ivan@example.com"
                        value={formInputs.email}
                        onChange={handleChangeInputValue}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="******"
                        value={formInputs.password}
                        onChange={handleChangeInputValue}
                    />
                    <div className="btn-group">
                        <Button design='default'>Sign up</Button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SignupPage;