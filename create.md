<script async src="../static/javascript/create.js"></script>

# Create Your Card

Select the options below and build your card.

<form id="createCard" action="#">
 
<div class="row">
<fieldset class="col-lg-6 col-sm-12">
  <legend>Profile settings:</legend>
    <div class="row">
      <div class="col">
        <input type="text" name="username" id="username" value="rodrigodonini" placeholder="WordPress Username" />
      </div>
    </div>
    <div class="row">
    <div class="col">
      <h4>Colors:</h4>
      <div class="row row-cols-auto">
        <div class="col color">
          <div class="color_picker"><input type="color" name="headerColor" id="headerColor" value="#191E23" /></div> <label for="headerColor">Header color </label>
        </div>
      </div>
      <div class="row row-cols-auto">
        <div class="col color">
            <div class="color_picker"><input type="color" name="subHeaderColor" id="subHeaderColor" value="#82878C" /></div> <label for="subHeaderColor">Sub header color </label>
        </div>
      </div>
      <div class="row row-cols-auto">
        <div class="col color">
            <div class="color_picker"><input type="color" name="nameColor" id="nameColor"  value="#191E23"/></div> <label for="nameColor">Name color </label>
        </div>
      </div>
      <div class="row row-cols-auto">
        <div class="col color">
            <div class="color_picker"><input type="color" name="badgeLabelColor" id="badgeLabelColor"  value="#23282D"/></div> <label for="badgeLabelColor">Badge label color </label>
        </div>
      </div>
      <div class="row row-cols-auto">
        <div class="col color">
            <div class="color_picker"><input type="color" name="foregroundColor" id="foregroundColor"  value="#ffffff"/></div> <label for="foregroundColor">Foreground color </label>
        </div>
      </div>
    </div>
    <div class="col">
      <h4>Options:</h4>
      <div class="row">
        <div class="col">
          <ul>
            <li>
              <input class="form-check-input me-1" type="checkbox" id="badges" name="badges" checked="checked" />
              <label class="form-check-label" for="badges"> Display badges?</label>
            </li>
            <li>
              <input class="form-check-input me-1" type="checkbox" id="header" name="header" checked="checked" />
              <label class="form-check-label" for="header"> Display header?</label>
            </li>
            <li>
              <input class="form-check-input me-1" type="checkbox" id="refresh" name="refresh" />
              <label class="form-check-label" for="refresh"> Force update</label>
            </li>
            <li>
              <input class="form-check-input me-1" type="checkbox" id="linkProfile" name="linkProfile" checked="checked" />
              <label class="form-check-label" for="linkProfile"> Link to your WordPress profile?</label>
            </li>
            <li>
              <input class="form-check-input me-1" type="checkbox" id="displayAvatar" name="displayAvatar" checked="checked" />
              <label class="form-check-label" for="displayAvatar"> Display avatar?</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 submit-button-col">
      <input type="submit" value="Create" class="btn btn-secondary mt-3">
    </div>
    <div class="col-12 submit-button-col">
      <a class="scroll-down" href="#result">Scroll down for results</a>
    </div>
  </div>
</fieldset>

</form>
   

<div id="result">

  <h2>Profile Card</h2>
  <div id="profileCard">
    <img src="static/images/loader.svg" class="loader" />
    <div class="value">  
    </div>
  </div>

  <h2>Profile Card URL</h2>
  <div class="link" id="profileCardUrl">
    <img src="static/images/loader.svg" class="loader" />
    <div class="value">  
    </div>
    <button onclick='copyText("profileCardUrl");'>Copy</button>
    <span class="copy"></span>
  </div>

  <h2>Markdown Format</h2>
  <div class="link" id="profileCardMarkdown">
    <img src="static/images/loader.svg" class="loader" />
    <div class="value">
    </div>
    <button onclick='copyText("profileCardMarkdown");'>Copy</button>
    <span class="copy"></span>
  </div>

  <h2>JSON Format</h2>
  <div class="link" id="profileCardJSON">
    <img src="static/images/loader.svg" class="loader" />
    <div class="value">
    </div>
    <button onclick='copyText("profileCardJSON");'>Copy</button>
    <span class="copy"></span>
  </div>

</div>



