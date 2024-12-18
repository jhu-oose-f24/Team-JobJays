const checkTokenExpiry = () => {
    // log
    console.log("Checking token expiry");
    const expirationDateString = localStorage.getItem("expirationDate");
    if (!expirationDateString) {
        return; // No expiration date stored
    }

    // Parse the stored date string
    const expirationTime = new Date(expirationDateString).getTime(); // Convert to milliseconds
    if (Date.now() > expirationTime) {
        // log
        console.log("Token has expired");
        handleLogout(); // Token has expired, log the user out
    }
    // log
    console.log("Token has not expired, trying in 5 seconds");
};

setInterval(checkTokenExpiry, 5000); // Check every 5 seconds

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    window.location.href = "/signin"; // Redirect to login
};
