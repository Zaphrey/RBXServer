require("dotenv").config()

const universeId = process.env.UNIVERSE_ID
const apiKey = process.env.API_KEY
const topic = "External"

module.exports.sendMessage = async (req, res) => {
    try {
        let response = await fetch(`https://apis.roblox.com/messaging-service/v1/universes/${universeId}/topics/${topic}`, {
            method: "POST",
            headers: {
                ["Content-Type"]: "application/json",
                ["x-api-key"]: apiKey
            },
            body: JSON.stringify({ message: "coolzak35 was here" })
        }).then(r => {
            console.log(r)
        })

        console.log(response.body)
    } catch (e) {
        console.error(e)
    }

    res.status(200).send("ok")
    // res.send("sup")
}