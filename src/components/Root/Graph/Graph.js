import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chart from "./chart";
import { Link } from "react-router-dom";
import buyService from "../../../services/purchase";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    "chart-container": {
        height: 400
    }
});

class Graph extends React.Component {
    state = {
        lineChartData: {
            labels: [],
            datasets: [
                {
                    type: "line",
                    label: "Price(SEK)",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderColor: this.props.theme.palette.primary.main,
                    pointBackgroundColor: this.props.theme.palette.secondary.main,
                    pointBorderColor: this.props.theme.palette.secondary.main,
                    borderWidth: "2",
                    lineTension: 0.45,
                    data: []
                }
            ]
        },
        lineChartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
            enabled: true
        },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    }
                ]
            }
        },
        compare: "",
        diff: "",
        gamePrice: ""
    };

    componentDidMount() {
        let game = this.props.match.params.game;
        // this.socket = io("ws://localhost:3070");
        this.socket = io("ws://project-api.kris3xiq-jsramverk.me:3070");
        this.socket.on("connect", () => {
            console.log("Connected REACT");
            this.socket.emit("set game", (game));
            this.socket.on("disconnect", () => {
                console.log("Bye react")
                game = "";
            })
        })

        this.socket.on("message", (e) => {
            const value = e;

            if (value.type !== "ticker") {
                return;
            }
            const oldBtcDataSet = this.state.lineChartData.datasets[0];
            const newBtcDataSet = { ...oldBtcDataSet };

            newBtcDataSet.data.push(value.price);
            if (value.price > this.state.gamePrice) {
                this.state.diff = (value.price - this.state.gamePrice); 
                this.state.compare = "more";
            } else {
                this.state.diff = (value.price - this.state.gamePrice); 
                this.state.compare = "less";
            }
            this.state.gamePrice = value.price;

            const newChartData = {
                ...this.state.lineChartData,
                datasets: [newBtcDataSet],
                labels: this.state.lineChartData.labels.concat(
                    new Date().toLocaleTimeString()
                )};

            this.setState({ lineChartData: newChartData });
        });
    }

    componentWillUnmount() {
        console.log("disconnected react");
        this.socket.disconnect();
    }

    comparePrice() {
        const divStyleMore = {
            color: 'green'
        }
        const divStyleLess = {
            color: 'red'
        }
        if (this.state.compare === "more") {
            return <div><p style={divStyleMore}>{this.state.gamePrice}</p><p style={divStyleMore}>+ {this.state.diff}</p></div>
        } else {
            return <div><p style={divStyleLess}>{this.state.gamePrice}</p><p style={divStyleLess}>{this.state.diff}</p></div>
        }
    }

    async buyStock(event) {
        event.preventDefault();
        let gameName = event.target.gameName.value;
        let gamePrice = event.target.gamePrice.value;
        let emailName = window.localStorage.getItem("unique");
        try {
            await buyService.purchaseStock({
                gameName, gamePrice, emailName
            });
        } catch (exception) {
            const errorMessage = "Something went wrong!"
            return errorMessage;
        }
    }
    verifyUser() {
        var user = window.localStorage.getItem("user");
        console.log("inne")
        if (!user) {
            return (
                <Link to="/account/login" className="nav-link-item">
                    <button className="buy-game-stock-login">Login to buy stocks</button>
                </Link>
            );
        } else {
            return (
                <form onSubmit={this.buyStock} className="buy-stock-form">
                    <input
                    type="hidden"
                    name="gameName"
                    value={this.props.match.params.game}
                    />
                    <input
                    type="hidden"
                    name="gamePrice"
                    value={this.state.gamePrice}
                    />
                    <button type="submit" className="buy-game-stock">Buy stocks</button>
                </form>
            );
        };
    }

    render() {
        const { classes } = this.props;
        var user = window.localStorage.getItem("user");
        return (
            <>
                <div className={classes["chart-container"]}>
                    <Chart
                        data={this.state.lineChartData}
                        options={this.state.lineChartOptions}
                    />
                </div>
                <div className="game-stock-wrapper">
                    <div className="game-stock-container">
                        <h6>Current price for {this.props.match.params.game} stocks</h6>
                        <div className="price-compare-container">
                            <div>{this.comparePrice()}</div>
                        </div>
                        {/* <button className="buy-game-stock" onClick={this.buyStock}>Buy stocks</button>
                        <button className="buy-game-stock-login">Loginto buy stocks</button> */}
                        {typeof user !== "undefined" && this.verifyUser()}
                    </div>
                </div>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Graph);
