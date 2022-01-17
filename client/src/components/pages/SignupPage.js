import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import HrefLessLink from "../../HrefLessLink";
import { AuthContext } from "../AuthContext";
import Button from "../Button";
import Input from "../Input";


const SignupPage = () => {

    const [formInputs, setFormInputs] = useState({
        name: '',
        email: '',
        password: ''
    });

    const {checkAuth} = useContext(AuthContext);

    const handleChangeInputValue = e => {
        setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    }

    const handleSubmitForm = async e => {
        e.preventDefault();
        try {
            await signUpNewUser(formInputs.name, formInputs.email, formInputs.password);
        } catch (error) {
            console.error(error.message);
        }
        console.log("-- submit");
    }

    const redirectTo = useNavigate();

    const signUpNewUser = async (name, email, password) => {
        try {
            const body = { name, email, password };
            const serverData = await fetch("http://localhost:5000/auth/register", {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const message = await serverData.json();
            console.log({ message });
            checkAuth();
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