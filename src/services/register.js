const register = async details => {
    const fetchOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": details.name,
            "email": details.email,
            "password": details.password
        })
    };
    const apiCall = await fetch(`http://localhost:3070/account/register`, fetchOptions);
    // const apiCall = await fetch(`https://me-api.kris3xiq-jsramverk.me/account/register`, fetchOptions);
    const res = await apiCall.json();

    return res;
}

export default { register }
