const addfunds = async details => {
    const fetchOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": details.email,
            "funds": details.funds
        })
    };
    const apiCall = await fetch(`http://localhost:3070/account/addfunds`, fetchOptions);
    const apiCall = await fetch(`http://project-api.kris3xiq-jsramverk.me/account/addfunds`, fetchOptions);
    const res = await apiCall.json();

    return res;
}

const getfunds = async details => {
    const fetchOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": details.email
        })
    };
    // const apiCall = await fetch(`http://localhost:3070/account/getfunds`, fetchOptions);
    const apiCall = await fetch(`http://project-api.kris3xiq-jsramverk.me/account/getfunds`, fetchOptions);
    const res = await apiCall.json();

    return res;
}

module.exports = {
    addfunds: addfunds,
    getfunds: getfunds
}
