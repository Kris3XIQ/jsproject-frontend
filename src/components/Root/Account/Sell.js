import React, { useEffect, useState } from "react";
import fundsService from "../../../services/funds";
import loginService from "../../../services/login";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Sell = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null)
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
            window.localStorage.setItem("unique", email);
            window.localStorage.setItem("firstLoad", true);
            setUser(user);
            setEmail("");
            setPassword("");
            history.push("/account");
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

    const processSale = async (event) => {
        event.preventDefault();
        const email = localStorage.getItem("unique");
        // const apiCall = await fetch("http://localhost:3070/games");
        const apiCall = await fetch("https://project-api.kris3xiq-jsramverk.me/games");
        const res = await apiCall.json();
        let url = window.location.pathname.split("/");
        let stock = (url[2]);
        let price;

        for (var i = 0; i < res.all.length; i++) {
            let apiurl = res.all[i].url;

            if (stock === apiurl) {
                price = res.all.[i].price;
            }
        }
        try {
            setMessage(`Sold one unit of: ${stock}, stock`);
            await fundsService.sellstock({ email, stock, price });
            return message;
        } catch (exception) {
            setErrorMessage("Failed to complete, not enough stocks");
            setMessage(null);
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

    const saleForm = () => {
        return (
            <>
                <div className="sell-wrapper">
                    <form onSubmit={processSale} className="sell-form">
                        <h1>Sell stock</h1>
                        <p>{errorMessage}</p>
                        <p>{message}</p>
                        <button type="submit" className="sell-confirm-button">Confirm</button>
                        <Link to="/account" className="accountButton">
                            <button>Back to account</button>
                        </Link>
                    </form> 
                </div>
            </>
        );
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="page-container funds">
                    {user !== null && saleForm()}
                    {user === null && loginForm()}
                </div>
            </div>
        </>
    );
};

export default Sell;
