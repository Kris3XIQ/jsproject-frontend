import io from "socket.io-client";
import React from "react";
import { Link } from "react-router-dom";

class Games extends React.Component {
    constructor() {
        super();
        this.state = { games: [], game: "" };
        this.game = { game: "" }
        // this.socket = io("ws://localhost:3070");
        this.socket = io("https://project-api.kris3xiq-jsramverk.me");
    }

    fetchGames = async () => {
        // const apiCall = await fetch("http://localhost:3070/games");
        const apiCall = await fetch("https://project-api.kris3xiq-jsramverk.me/games");
        const res = await apiCall.json();
        for (var i = 0; i < res.all.length; i++) {
            let name = res.all[i].name;
            let price = res.all[i].price;
            let url = res.all[i].url;
            let img = res.all[i].img;

            this.setState({
                games: [...this.state.games, { name, price, url, img }]
            })
        }
    }

    updatePrices = async () => {
        // const apiCall = await fetch("http://localhost:3070/games");
        const apiCall = await fetch("https://project-api.kris3xiq-jsramverk.me/games");
        const res = await apiCall.json();
        for (var i = 0; i < res.all.length; i++) {
            let price = res.all[i].price;
            this.setState({
                games: [...this.state.games, { price }]
            })
        }
    }

    componentDidMount() {
        this.fetchGames();
    }

    renderGames() {
        const { games } = this.state;
        return games.map(({ name, price, img, url }, idx) => (
          <div className="game-container" key={idx}>
            <div className="game-img">
                <Link to={`/games/${url}/graph`} className="gameGraph">
                    <img src={require(`../../../static/img/${img}`)} alt={`Cover of ${name}`}></img>
                </Link>
            </div>
            <h6 className="game-name">{name}</h6>
            <p className="game-price">Stock price: {price}</p>
          </div>
        ));
    }

    render() {
        return (
            <>
                <div className="page-wrapper">
                    <div className="games-wrapper">{this.renderGames()}</div>
                </div>
            </>
        );
    }
    
}

export default Games;


