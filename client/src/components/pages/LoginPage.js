import Input from "../Input";
import Button from "../Button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import HrefLessLink from "../../HrefLessLink";

const LoginPage = () => {
    const { checkAuth } = useContext(AuthContext);
    const [formInputs, setFormInputs] = useState({
        email: '',
        password: ''
    })
    const handleChangeInputValue = e => {
        setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    }

    const logInUser = async (email, password) => {
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:5000/auth/login", {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const message = await response.json();
            console.log(message);
            checkAuth();
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        logInUser(formInputs.email, formInputs.password);
    }

    const redirectTo = useNavigate();

    return (
        <main>
            <div className="login login-wrapper">
                <div className="login-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmitForm}>
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
                            redirectTo("/signup")
                        }}>Don't have an accout yet?</HrefLessLink>
                        <div className="btn-group">
                            <Button design='default'>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default LoginPage;