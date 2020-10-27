import React, { useEffect, useState } from "react";
import fundsService from "../../../services/funds";
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
                        <h6>Click on a specific stock to sell one unit</h6>
                        <Link to="/account/callofdutycw/sell" className="accountAddFunds">
                            <p>CoD stocks: {cod}</p>
                        </Link>
                        <Link to="/account/cyberpunk2077/sell" className="accountAddFunds">
                            <p>Cyberpunk stocks: {cyberpunk}</p>
                        </Link>
                        <Link to="/account/destiny2/sell" className="accountAddFunds">
                            <p>Destiny 2 stocks: {destiny2}</p>
                        </Link>
                        <Link to="/account/newworld/sell" className="accountAddFunds">
                            <p>New World stocks: {nw}</p>
                        </Link>
                        <Link to="/account/stellaris/sell" className="accountAddFunds">
                            <p>Stellaris stocks: {stellaris}</p>
                        </Link>
                        <Link to="/account/wow/sell" className="accountAddFunds">
                            <p>WoW stocks: {wow}</p>
                        </Link>
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
