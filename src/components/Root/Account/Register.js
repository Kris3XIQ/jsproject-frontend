import React, { useEffect, useState } from "react";
import registerService from "../../../services/register";
import { useHistory } from "react-router-dom";

const Register = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const currentUserJSON = window.localStorage.getItem("user");
        if (currentUserJSON) {
            const user = JSON.parse(currentUserJSON);
            setUser(user);
        }
    }, []);

    const processRegister = async (event) => {
        event.preventDefault();
        try {
            const user = await registerService.register({
                name, email, password
            });

            setUser(user);
            setName("");
            setEmail("");
            setPassword("");
            history.push("/account/login");
        } catch (exception) {
            setErrorMessage("User is already taken");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return errorMessage;
        }
    };

    const registerForm = () => {
        return (
            <>
                <div className="register-wrapper">
                    <form onSubmit={processRegister} className="register-form">
                        <h1>Register</h1>
                        <p>{errorMessage}</p>
                        <div className="register-form-input">
                            <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            autoComplete="on"
                            onChange={({ target }) => setName(target.value)}
                            required />
                        </div>
                        <div className="register-form-input">
                            <input
                            type="text"
                            value={email}
                            name="email"
                            placeholder="Email"
                            autoComplete="on"
                            onChange={({ target }) => setEmail(target.value)}
                            required />
                        </div>
                        <div className="register-form-input">
                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="on"
                            onChange={({ target }) => setPassword(target.value)}
                            required />
                        </div>
                        <p>
                            Already have an account?
                        </p>
                        <a href="/account/login">Login here</a>
                        <button type="submit" className="register-form-button">Register</button>
                    </form>
                </div>
            </>
        )
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="page-container login">
                    {user === null && registerForm()}
                </div>
            </div>
        </>
    );
};

export default Register;
