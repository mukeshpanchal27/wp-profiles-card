<script>
(function(window, document, undefined) {

  window.onload = init;

  // const domain = "https://cardpress.us/";
  const domain = "http://127.0.0.1:3000/";

  function init(){

    const formEl = document.getElementById('createCard');
    if (formEl) {
        formEl.addEventListener('submit', function(event) {
            event.preventDefault();
            document.getElementById("result").style.display = "none";
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
              
              const profileCardUrl = document.getElementById('profileCardUrl');
              // profileCardUrl.innerHTML = '';
              profileCardUrl.innerText = getProfileURL(username, headerColor, subHeaderColor, nameColor, badgeLabelColor, foregroundColor, badges, header, refresh, linkProfile, displayAvatar );

              getProfileJSON(username);

              getProfileCard(username, headerColor, subHeaderColor, nameColor, badgeLabelColor, foregroundColor, badges, header, refresh, linkProfile, displayAvatar);

              document.getElementById("result").style.display = "block";
            } else {
              alert("Please, inform username.");
            }

        });
    } else {
        console.log("no form", document);
    }

    function getProfileURL(username, headerColor, subHeaderColor, nameColor, badgeLabelColor, foregroundColor, badges, header, refresh, linkProfile, displayAvatar){
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
      const profileCardJSON = document.getElementById('profileCardJSON');
      // profileCardJSON.innerHTML = '';
      let url = domain + "json?username=" + username;
      // or async/await
      (async()=> 
        profileCardJSON.innerText = JSON.stringify(await(await fetch(url)).json())
      )();
    }

    function getProfileCard(username, headerColor, subHeaderColor, nameColor, badgeLabelColor, foregroundColor, badges, header, refresh, linkProfile, displayAvatar) {
      const profileCard = document.getElementById('profileCard');
      const cardImage = document.createElement('img');
      let url = getProfileURL(username, headerColor, subHeaderColor, nameColor, badgeLabelColor, foregroundColor, badges, header, refresh, linkProfile, displayAvatar);
      cardImage.src = url
      profileCard.innerHTML = '';
      profileCard.appendChild(cardImage);
    }

  }

})(window, document, undefined);

async function copyText(elementId) {
  const divElement = document.getElementById(elementId);
  const textToCopy = divElement.innerText; // Get the plain text content of the div

  try {
    await navigator.clipboard.writeText(textToCopy);
    alert('Text copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
    alert('Failed to copy text.');
  }
}


</script>

# Create Your Card

Select the options below and build your card.

<form id="createCard" action="#">
 <fieldset>
  <legend>Profile settings:</legend>


<div class="container-fluid">
  <div class="row">
    <div class="col">
    <label for="username">Username: </label><br /><input type="text" name="username" id="username" value="rodrigodonini" />
    </div>
</div>
  <div class="row row-cols-auto">
    <div class="col">
      <label for="headerColor">Header color: </label><br /><input type="color" name="headerColor" id="headerColor" value="#191E23" />
    </div>
    <div class="col"> 
        <label for="subHeaderColor">Sub header color: </label><br /><input type="color" name="subHeaderColor" id="subHeaderColor" value="#82878C" />
    </div>
    <div class="col">
        <label for="nameColor">Name color: </label><br /><input type="color" name="nameColor" id="nameColor"  value="#191E23"/>
    </div>
    <div class="col">
        <label for="badgeLabelColor">Badge label color: </label><br /><input type="color" name="badgeLabelColor" id="badgeLabelColor"  value="#23282D"/>
    </div>
    <div class="col">
        <label for="foregroundColor">Foreground color: </label><br /><input type="color" name="foregroundColor" id="foregroundColor"  value="#ffffff"/>
    </div>
</div>



<fieldset>
  <legend>Options:</legend>
    <input type="checkbox" id="badges" name="badges" checked="checked" />
    <label for="badges"> Display badges?</label><br>

<input type="checkbox" id="header" name="header" checked="checked" />
<label for="header"> Display header?</label><br>

<input type="checkbox" id="refresh" name="refresh" />
<label for="refresh"> Force update</label><br>

<input type="checkbox" id="linkProfile" name="linkProfile" checked="checked" />
<label for="linkProfile"> Link to your WordPress profile?</label><br>

<input type="checkbox" id="displayAvatar" name="displayAvatar" checked="checked" />
<label for="displayAvatar"> Display avatar?</label><br>
</fieldset>

<input type="submit" value="Create">
</div>
   </fieldset>

<div id="result">
  <h2>Profile Card URL</h2>
  <div class="link">
    <div id="profileCardUrl">
      <img src="static/images/loader.svg" class="loader" />
    </div>
    <button onclick='copyText("profileCardUrl");'>Copy</button>
  </div>

  <h2>JSON Format</h2>
  <div class="link">
    <div id="profileCardJSON">
        <img src="static/images/loader.svg" class="loader" />
    </div>
    <button onclick='copyText("profileCardJSON");'>Copy</button>
  </div>

  <h2>Profile Card</h2>
  <div id="profileCard">
  </div>

</div>

</form>

