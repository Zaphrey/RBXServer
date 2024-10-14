require("dotenv").config()

const universeId = process.env.UNIVERSE_ID
const apiKey = process.env.API_KEY
const topic = "External"

let commandQueue = [
    "u=1232",
    "c=Hello, world!",
]

module.exports.sendMessage = async (message) => {
    let success = false

    try {
        let response = await fetch(`https://apis.roblox.com/messaging-service/v1/universes/${universeId}/topics/${topic}`, {
            method: "POST",
            headers: {
                ["Content-Type"]: "application/json",
                ["x-api-key"]: apiKey
            },
            body: JSON.stringify({ message: message })
        })

        if (response) {
            success = true
            console.log(response)
        }
    } catch (e) {
        console.error(e)
    }

    return success
}

module.exports.addCommand = async (req, res) => {
    const body = req.body

    if (body.command && body.details) {
        commandQueue.push(`${body.command}=${body.details}`)
    }

    res.send(commandQueue[commandQueue.length - 1])
}

module.exports.getCommand = (req, res) => {
    const cmdIndex = req.params.index

    if (commandQueue[cmdIndex - 1]) {
        res.send(commandQueue[cmdIndex - 1])
        console.log(commandQueue[cmdIndex - 1])
    }
    else {
        res.status(400).send("invalid index")
    }
}

module.exports.getCommands = (req, res) => {
    res.send(JSON.stringify(commandQueue))
}

module.exports.sendCommand = async (req, res) => {
    const cmdIndex = req.params.index - 1 || 0

    if (commandQueue[cmdIndex]) {
        console.log(`sending command: ${commandQueue[cmdIndex]}`)

        let success = await this.sendMessage(commandQueue[cmdIndex])
        
        if (success) {
            commandQueue.splice(commandQueue, cmdIndex)
            res.status(200).send("Ok")
        }
        else {
            res.status(404).send("could not fulfill request")
        }
    }
    else {
        res.status(400).send("could not find command")
    }
}

module.exports.sendCommands = async (req, res) => {
    if (commandQueue.length > 0) {
        let success = await this.sendMessage(commandQueue.join("~"))

        if (success) {
            res.status(200).send("Ok")
        }
        else {
            res.status(404).send("could not fulfill request")
        }
    }
    else {
        res.status(400).send("could not find command")
    }
}