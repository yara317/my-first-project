// Get all requests
function getRequests() {
    return JSON.parse(localStorage.getItem("requests")) || [];
}

// Save requests
function saveRequests(data) {
    localStorage.setItem("requests", JSON.stringify(data));
}