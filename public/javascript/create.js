(function(window, document, undefined) {

  window.onload = init;

  const domain = "https://cardpress.us/";
//   const domain = "http://127.0.0.1:3000/";

  function init(){

    const formEl = document.getElementById('createCard');
    if (formEl) {
        formEl.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(formEl);
            const username    = formData.get('username');
            const headerColor = formData.get('headerColor').replace("#", "");
            const subHeaderColor = formData.get('subHeaderColor').replace("#", "");
            const nameColor = formData.get('nameColor').replace("#", "");
            const badgeLabelColor = formData.get('badgeLabelColor').replace("#", "");
            const foregroundColor = formData.get('foregroundColor').replace("#", "");
            const badges = formData.get('badges');
            const header = formData.get('header');
            const refresh = formData.get('refresh');
            const linkProfile = formData.get('linkProfile');
            const displayAvatar = formData.get('displayAvatar');

            if (username !== "") {
              
                document.getElementById("result").style.display = "block";
                document.getElementsByClassName("scroll-down")[0].style.display = "block";

                const profileCardUrl = document.querySelector("#profileCardUrl .value");
                cleanUpElement("#profileCardUrl", true);
                profileCardUrl.innerText = getProfileURL(username, headerColor, subHeaderColor, nameColor, badgeLabelColor, foregroundColor, badges, header, refresh, linkProfile, displayAvatar );
                cleanUpElement("#profileCardUrl", false);

                getProfileJSON(username);

                getProfileMarkdown(username, linkProfile);

                getProfileCard(username, headerColor, subHeaderColor, nameColor, badgeLabelColor, foregroundColor, badges, header, refresh, linkProfile, displayAvatar);
            } else {
                document.querySelector(".username-validation").style.display = "block";
                setTimeout(function() {
                    document.querySelector(".username-validation").style.display = "none";
                }, 3000);
            }

        });
    } else {
        console.log("no form", document);
    }

    function getProfileURL(
        username, 
        headerColor, 
        subHeaderColor, 
        nameColor, 
        badgeLabelColor, 
        foregroundColor, 
        badges, 
        header, 
        refresh, 
        linkProfile, 
        displayAvatar){
        let url = domain + "card?";
        
        // Test username
        if (username !== "") {
            url += "username=" + username;
        }

        // Test headerColor
        if (headerColor !== "") {
            url += "&headerColor=" + headerColor;
        }

        // Test subHeaderColor
        if (subHeaderColor !== "") {
            url += "&subHeaderColor=" + subHeaderColor;
        }

        // Test nameColor
        if (nameColor !== "") {
            url += "&nameColor=" + nameColor;
        }

        // Test badgeLabelColor
        if (badgeLabelColor !== "") {
            url += "&badgeLabelColor=" + badgeLabelColor;
        }

        // Test foregroundColor
        if (foregroundColor !== "") {
            url += "&foreground=" + foregroundColor;
        }

        // Test badges
        if (badges == "on") {
            url += "&badges=true";
        } else {
            url += "&badges=false";
        }

        // Test header
        if (header == "on") {
            url += "&header=true";
        } else {
            url += "&header=false";
        }

        // Test refresh
        if (refresh == "on") {
            url += "&refresh=true";
        } else {
            url += "&refresh=false";
        }

        // Test linkProfile
        if (linkProfile == "on") {
            url += "&link=true";
        } else {
            url += "&link=false";
        }

        // Test displayAvatar
        if (displayAvatar == "on")  {
            url += "&avatar=true";
        } else {
            url += "&avatar=false";
        }
        
        return url;
    }

    function getProfileJSON(username) {
        const profileCardJSON = document.querySelector("#profileCardJSON .value");
        cleanUpElement("#profileCardJSON", true);
        let url = domain + "json?username=" + username;
        (async()=> 
            profileCardJSON.innerText = JSON.stringify(await(await fetch(url)).json(),
            cleanUpElement("#profileCardJSON", false))
        )();
    }

    function getProfileMarkdown(
        username, 
        linkProfile) {
            const profileCardMarkdown = document.querySelector("#profileCardMarkdown .value");
            cleanUpElement("#profileCardMarkdown", true);
            let url                   = domain + "json?username=" + username;
            let markdown              = "[![FIRSTNAME's WordPress Activity](" + domain + "card?username=" + username + ")](TARGETURL)";
            
            if (linkProfile === "on") {
                linkProfile = "https://profile.wordpress.org/" + username;
            } else {
                linkProfile = "https://cardpress.us/";
            }

            (async () => await (await fetch(url)).json())()
            .then(data => {
                markdown = markdown.replace( "FIRSTNAME", data.name.split(" ")[0] );
                markdown = markdown.replace( "TARGETURL", linkProfile );
                profileCardMarkdown.innerText = markdown;
                cleanUpElement("#profileCardMarkdown", false);
            })
            .catch(err => {
                console.error("Error fetching:", err);
            });
    }

    function getProfileCard(
        username, 
        headerColor, 
        subHeaderColor, 
        nameColor, 
        badgeLabelColor, 
        foregroundColor, 
        badges, 
        header, 
        refresh, 
        linkProfile, 
        displayAvatar) {
            const profileCard = document.querySelector("#profileCard .value");
            cleanUpElement("#profileCard", true);
            let url = getProfileURL(username, headerColor, subHeaderColor, nameColor, badgeLabelColor, foregroundColor, badges, header, refresh, linkProfile, displayAvatar);

            (async () => await (await fetch(url)))()
            .then(data => {
                const cardImage = document.createElement('img');
                cardImage.src = data.url;
                cleanUpElement("#profileCard", false);
                profileCard.appendChild(cardImage);
            })
            .catch(err => {
                console.error("Error fetching:", err);
            });
    }

    function cleanUpElement(elName, show) {
        const element = document.querySelector(elName + " .value");
        const loader  = document.querySelector(elName + " .loader");
        if (show) {
            element.innerHTML = '';
            loader.style.display = "block";
        } else {
            loader.style.display = "none";
        }

    }

  }

})(window, document, undefined);

async function copyText(elementId) {
    const divElement = document.getElementById(elementId);
    const textToCopy = divElement.innerText; // Get the plain text content of the div

    try {
        await navigator.clipboard.writeText(textToCopy);
        divElement.querySelector(".copy").style.display = "block"; 
        divElement.querySelector(".copy").innerHTML = "Copied!"; 
        setTimeout(function() {
            divElement.querySelector(".copy").style.display = "none"; 
        }, 3000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text.');
    }
}

