import React, { useEffect, useState } from "react";
import fundsService from "../../../services/funds";
import loginService from "../../../services/login";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Account = () => {
    const history = useHistory();
    const [funds, setFunds] = useState("");
    const [cod, setCod] = useState("");
    const [cyberpunk, setCyberpunk] = useState("");
    const [destiny2, setDestiny2] = useState("");
    const [nw, setNw] = useState("");
    const [stellaris, setStellaris] = useState("");
    const [wow, setWow] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const currentUserJSON = window.localStorage.getItem("user");
        if (currentUserJSON) {
            const user = JSON.parse(currentUserJSON);
            setUser(user);
        } else {
            noUser();
        }

        getFunds();
    }, []);

    const noUser = async () => {
        history.push("/account/login");
    }

    const getFunds = async () => {
        const email = localStorage.getItem("unique");
        var allStocks = {};

        try {
            const accountInfo = await fundsService.getfunds({
                email
            });
            setFunds(accountInfo.funds.currency);
            setCod(accountInfo.cod.amount);
            setCyberpunk(accountInfo.cyberpunk.amount);
            setDestiny2(accountInfo.d2.amount);
            setNw(accountInfo.nw.amount);
            setStellaris(accountInfo.stellaris.amount);
            setWow(accountInfo.wow.amount);
        } catch (exception) {
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return errorMessage;
        }
    };

    const accountInfo = () => {
        return (
            <>
                <div className="account-wrapper">
                    <div className="account-container">
                        <h5>Current funds:</h5>
                        <p>{funds}</p>
                        <p>CoD stocks: {cod}</p>
                        <p>Cyberpunk stocks: {cyberpunk}</p>
                        <p>Destiny 2 stocks: {destiny2}</p>
                        <p>New World stocks: {nw}</p>
                        <p>Stellaris stocks: {stellaris}</p>
                        <p>WoW stocks: {wow}</p>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="page-container account">
                    {user !== null && accountInfo()}
                        <Link to="/account/funds" className="accountAddFunds">
                            <button>Add Funds</button>
                        </Link>
                </div>
            </div>
        </>
    );
};

export default Account;
