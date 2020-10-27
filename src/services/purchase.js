const purchaseStock = async details => {
    const fetchOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": details.gameName,
            "price": details.gamePrice,
            "email": details.emailName
        })
    };

    // const apiCall = await fetch(`http://localhost:3070/games/${details.gameName}/buystock`, fetchOptions);
    const apiCall = await fetch(`https://project-api.kris3xiq-jsramverk.me/games/${details.gameName}/buystock`, fetchOptions);
    const res = await apiCall.json();

    return res;
}

export default purchaseStock;
