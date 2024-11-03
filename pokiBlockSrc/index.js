let pokiBlockSDK = {}

pokiBlockSDK.ERROR = "pokiBlockSDKError"
pokiBlockSDK.SENT = "pokiBlockSDKSent"
pokiBlockSDK.INIT = "pokiBlockSDKInit"

/**
 * Initializes the PokiBlock SDK connection.
 * @return {Promise<{type: "pokiBlockSDKInit" | "pokiBlockSDKError", open?: boolean, error?: Error}>}
 * Resolves with an object containing a type key, which is always "pokiBlockSDKInit".
 * If the connection was successfully opened, the open key is present and true.
 * If an error occurred during initialization, the error key is present and contains the error.
 */
pokiBlockSDK.init = () => {
    return new Promise(resolve => {
        try {
            this.connection = new WebSocket("ws://localhost:1765")
            this.connection.addEventListener("open", () => {
                resolve({"type": "pokiBlockSDKInit", "open": connection.readyState === connection.OPEN})
            })
        } catch (error) {
            console.log(error)
            resolve({"type": "pokiBlockSDKError", "error": error})
        }
    })
}

pokiBlockSDK.blocked = async () => {
    try {
        
        this.connection.send("blocked")
        return {"type": "pokiBlockSDKSent"}
    } catch (error) {
        console.log(error)
        return {"type": "pokiBlockSDKError", "error": error}
    }
}

pokiBlockSDK.gameStarted = async () => {
    try {
        this.connection.send("gameStarted")
        return {"type": "pokiBlockSDKSent"}
    } catch (error) {
        console.log(error)
        return {"type": "pokiBlockSDKError", "error": error}
    }
}

pokiBlockSDK.gameEnded = async () => {
    try {
        this.connection.send("gameEnded")
        return {"type": "pokiBlockSDKSent"}
    } catch (error) {
        console.log(error)
        return {"type": "pokiBlockSDKError", "error": error}
    }
}

window.pokiBlockSDK = pokiBlockSDK