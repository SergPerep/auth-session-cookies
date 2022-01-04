import Input from "../Input";
import Button from "../Button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import HrefLessLink from "../../HrefLessLink";

const LoginPage = () => {
    const { isUserAuthorized } = useContext(AuthContext);
    const [formInputs, setFormInputs] = useState({
        email: '',
        password: ''
    })
    const handleChangeInputValue = e => {
        setFormInputs({ formInputs, [e.target.name]: e.target.value });
    }
    const handleSubmitForm = e => {
        e.preventDefault();
    }

    const redirectTo = useNavigate();

    console.log(isUserAuthorized);

    return (
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
                    <HrefLessLink onClick={() => redirectTo("/signup")}>Don't have an accout yet?</HrefLessLink>
                    <div className="btn-group">
                        <Button design='default'>Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;