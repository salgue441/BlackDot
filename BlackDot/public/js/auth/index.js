(function updateTokens() {
    const fourMinutes = 1000 * 60 * 4;
    refreshTokens();

    const interval = setInterval(() => {
        refreshTokens();
    }, fourMinutes);

    return () => clearInterval(interval);
})();

async function refreshTokens() {
    const { refreshToken } = getTokens();
    if (!refreshToken) return;

    console.log("No es 8")
    try {
        const res = await fetch("/auth/token/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken,
            }),
        });

        const data = await res.json();
        console.log(data)

        deleteTokens();
        setTokens(data);
    } catch (err) {
        deleteTokens();
        console.log(err);
    }
}