function getActiveUser() {
    const currentUserJSON = window.localStorage.getItem("user");
    if (currentUserJSON) {
        const res = JSON.parse(currentUserJSON);
        return res.user.name;
    }
}

function getActiveToken() {
    const currentUser = window.localStorage.getItem("user");
    if (currentUser) {
        const res = JSON.parse(currentUser);
        return res.access_token;
    }
}

module.exports = {
    getActiveUser: getActiveUser,
    getActiveToken: getActiveToken,
}
