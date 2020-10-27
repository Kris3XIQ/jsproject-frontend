import React from "react";
import { Link } from "react-router-dom";
import { getActiveUser } from "../../../services/auth";

const Nav = () => {
    const user = getActiveUser();

    const noActiveUser = () => {
        return (
            <>
                <nav>
                    <ul className="nav-links">
                        <li>
                            <Link to="/account/login" className="nav-link-item">Login</Link>
                        </li>
                    </ul>
                </nav>
            </>
        );
    };

    const activeUser = () => {
        return (
            <>
                <Link to="/account/" className="accountClicker">
                    <div className="active-user-wrapper">
                        <div id="activeUser">
                            <p>
                                {user}
                            </p>
                        </div>
                    </div>
                </Link>
            </>
        );
    };

    const logOut = () => {
        function confirmLogout() {
            window.localStorage.clear();
        }
        return (
            <nav>
                <ul className="nav-links">
                    <li>
                        <a className="nav-link-item" href="." onClick={ confirmLogout }>Logout</a>
                    </li>
                </ul>
            </nav>
        );
    }
    
    return (
        <>
            <div className="top-nav-wrapper">
                <nav>
                    <ul className="nav-links">
                        <li>
                            <Link to="/" className="nav-link-item">Home</Link>
                        </li>
                        <li>
                            <Link to="/games" className="nav-link-item">Games</Link>
                        </li>
                    </ul>
                </nav>
                <div className="accountInfo">
                    {typeof user !== "undefined" && logOut()}
                    {typeof user === "undefined" && noActiveUser()}
                    {typeof user !== "undefined" && activeUser()}
                </div>
            </div>
        </>
    );
}

export default Nav;
