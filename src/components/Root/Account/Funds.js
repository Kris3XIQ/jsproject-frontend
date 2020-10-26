import React, { useEffect, useState } from "react";
import fundsService from "../../../services/funds";
import loginService from "../../../services/login";
import { useHistory } from "react-router-dom";

const Funds = () => {
    // const history = useHistory();
    const [funds, setFunds] = useState("");
    const [email, setEmail] = useState("");
    const [unique, setUnique] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const currentUserJSON = window.localStorage.getItem("user");
        if (currentUserJSON) {
            const user = JSON.parse(currentUserJSON);
            setUser(user);
        }
    }, []);

    const processLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                email, password
            });

            window.localStorage.setItem(
                "user", JSON.stringify(user)
            );
            setUnique(email)
            window.localStorage.setItem("unique", email);
            window.localStorage.setItem("firstLoad", true);

            setUser(user);
            setEmail("");
            setPassword("");
            setUnique("");
            // history.push("/");
            if (localStorage.getItem("firstLoad")) {
                window.localStorage.removeItem("firstLoad");
                window.location.reload();
            }
        } catch (exception) {
            setErrorMessage("Login details didnt match!");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return errorMessage;
        }
    };

    const processFunds = async (event) => {
        event.preventDefault();
        const email = localStorage.getItem("unique");
        console.log(email)
        try {
            const addFunds = await fundsService.addfunds({
                email, funds
            });

            console.log(user);
            // window.localStorage.setItem("firstLoad", true);

            // setUser(user);
            // setEmail("");
            // setPassword("");
            // history.push("/");
            // if (localStorage.getItem("firstLoad")) {
            //     window.localStorage.removeItem("firstLoad");
            //     window.location.reload();
            // }
        } catch (exception) {
            setErrorMessage("Couldnt complete your order!");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return errorMessage;
        }
    };

    const loginForm = () => {
        return (
            <>
                <div className="login-wrapper">
                    <form onSubmit={processLogin} className="login-form">
                        <h1>Login</h1>
                        <p>{errorMessage}</p>
                        <div className="login-form-input">
                            <input
                            type="text"
                            value={email}
                            name="email"
                            placeholder="Email"
                            autoComplete="on"
                            onChange={({ target }) => setEmail(target.value)}
                            required />
                        </div>
                        <div className="login-form-input">
                            <input 
                            type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            autoComplete="on"
                            onChange={({ target }) => setPassword(target.value)}
                            required />
                        </div>
                        <p>
                            Don't have an Kris3XIQ Trading account?
                        </p>
                        <a href="/account/register">Register here!</a>
                        <button type="submit" className="login-form-button">Login</button>
                    </form> 
                </div>
            </>
        );
    };

    const fundsForm = () => {
        return (
            <>
                <div className="funds-wrapper">
                    <form onSubmit={processFunds} className="funds-form">
                        <h1>Funds</h1>
                        <p>{errorMessage}</p>
                        <div className="funds-form-input">
                            <input
                            type="number"
                            value={funds}
                            name="funds"
                            placeholder="Funds"
                            autoComplete="on"
                            onChange={({ target }) => setFunds(target.value)}
                            required />
                        </div>
                        <button type="submit" className="funds-form-button">Add funds!</button>
                    </form> 
                </div>
            </>
        );
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="page-container funds">
                    {user !== null && fundsForm()}
                    {user === null && loginForm()}
                </div>
            </div>
        </>
    );
};

export default Funds;
