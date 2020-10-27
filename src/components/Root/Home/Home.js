import React from "react";

const Home = () => {
    return (
        <>
            <div className="homepage-wrapper">
                <img src={require("../../../static/img/frontpage.jpg")} alt="homepage background"></img>
                <div className="homepage-container">
                    <h1>Kris3XIQ</h1>
                    <h2>Trading</h2>
                </div>
            </div>
        </>
    );
}

export default Home;
