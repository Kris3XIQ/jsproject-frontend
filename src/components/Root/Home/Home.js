import React, { useEffect, useState } from "react";

const Home = () => {
    const [text, setText] = useState("");

    useEffect(() => {
        fetch("http://localhost:3070/")
        // fetch("https://me-api.kris3xiq-jsramverk.me")
        .then(res => res.json())
        .then(res => setText(res.text))
    })
    return (
        <>
            <div className="homepage-wrapper">
                <div className="homepage-container">
                    <h1>Om mig</h1>
                    <div className="homepage-text-container">
                    <p>
                        {text}
                    </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
