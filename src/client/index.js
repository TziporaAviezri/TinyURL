const shortedURLForm = document.getElementById("shortedURLForm");
const visitedCountForm = document.getElementById("visitedCountForm")
const input = document.querySelector("input");
const linkWrapper = document.querySelector(".link-wrapper");
const errorDiv = document.querySelector(".error");
const shortenedLink = document.querySelector(".short-link");

async function handleShortedURLSubmit() {
    let url = document.querySelector("#url").value;
    if (url) {
        try {
            const response = await fetch("http://localhost:8000/shortedURL", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ url }),
            })
            try {
                const jsonResponse = await response.json()
                if (jsonResponse.type == "failure") {
                    input.style.border = "2px solid red";
                    errorDiv.textContent = `${response.message}, please try another one!`;
                }
                if (jsonResponse.type == "success") {
                    linkWrapper.style.opacity = 1;
                    linkWrapper.style.scale = 1;
                    linkWrapper.style.display = "flex";
                    shortenedLink.textContent = jsonResponse.message;
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        catch (error) { console.error(error) }
    }
}



const clearFields = () => {
    let url = document.querySelector("#url");
    url.value = '';
    url.addEventListener('focus', () => {
        errorDiv.textContent = '';
    })
}

async function handleVisitedCountSubmit() {
    let url = document.querySelector("#short-link").textContent;
    try {
        const response = await fetch("http://localhost:8000/visited", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ url }),
        })
        try {
            const jsonResponse = await response.json()
            console.log(jsonResponse);
            alert(url + " visited " + jsonResponse.visitedCounter + " times")
        }
        catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        console.log(error);
    }
}

shortedURLForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleShortedURLSubmit();
    clearFields();
});

visitedCountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleVisitedCountSubmit()
})