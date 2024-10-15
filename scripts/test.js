const getButton = document.getElementById("getButton")

getButton.addEventListener("click", () => {
    fetch("https://rbxhserver.onrender.com/commands").then(request => {
        let data = request.json()

        console.log(data)
    })
})