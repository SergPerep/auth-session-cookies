import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HrefLessLink from "../../HrefLessLink";
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

    const handleSubmitForm = async e => {
        try {
            const token = await signUpNewUser(formInputs.name, formInputs.email, formInputs.password);
            localStorage.setItem("token", token);
        } catch (error) {
            console.error(error.message);
        }
        e.preventDefault();
        console.log("-- submit");
    }

    const redirectTo = useNavigate();

    const signUpNewUser = async (name, email, password) => {
        try {
            const body = { name, email, password };
            const response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const { token } = await response.json();
            return token;
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <main>
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
                        <HrefLessLink onClick={e => {
                            e.preventDefault();
                            redirectTo("/login")
                        }}>Already have an account?</HrefLessLink>
                        <div className="btn-group">
                            <Button design='default'>Sign up</Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>

    )
}

export default SignupPage;