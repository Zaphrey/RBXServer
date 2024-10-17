const getButton = document.getElementById("getButton")
const commandTable = document.getElementById("commandBody")

const addButton = document.getElementById("addButton")

const addCommand = async () => {
    let command = document.getElementById("commandInput")
    let commandData = document.getElementById("commandDataInput")

    fetch("https://rbxhserver.onrender.com/commands", {
        method: "POST",
        headers: {
            ["Content-Type"]: "application/json",
        },
        body: {
            command: command.value,
            details: commandData.value
        }
    })

    command.value = ""
    commandData.value = ""
}

const loadCommands = async () => {
    fetch("https://rbxhserver.onrender.com/commands").then(request => {
        request.json().then(data => {
        commandTable.innerHTML = ""

           data.forEach(element => {
            let commandParts = element.split("=")
            let listElement = document.createElement("tr")
            let commandElement = document.createElement("th")
            let commandDataElement = document.createElement("th")

            commandElement.innerText = commandParts[0]
            commandDataElement.innerText = commandParts[1]

            listElement.appendChild(commandElement)
            listElement.appendChild(commandDataElement)

            commandTable.appendChild(listElement)
           });
        })
    })
}

getButton.addEventListener("click", loadCommands)
addButton.addEventListener("click", addCommand)
loadCommands()