
async function renderCard(fonts, css, username, name, membersince, avatar, badges, link) {

    let htmlResult =  `
    <html>
        <meta charset="UTF-8">
        <head>
            <style>
            @font-face {
                font-family: 'Open Sans';
                font-display: swap;
                src: url(${fonts[0]}) format('truetype');
                font-weight: normal;
                font-style: normal;
            }
            @font-face {
                font-family: 'Open Sans';
                font-display: swap;
                src: url(${fonts[1]}) format('truetype');
                font-weight: 600;
                font-style: normal;
            }
            @font-face {
                font-family: 'Open Sans';
                font-display: swap;
                src: url(${fonts[3]}) format('truetype');
                font-weight: 700;
                font-style: normal;
            }
            body {
                margin:0;
                padding: 0;
                color: #${css[0]};
                font-family: 'Open Sans';
            }
            .card {
                ${css[2]}
                padding:20px;
                background-color: #${css[1]};
            }
            a {
                text-decoration: none;
            }
            .avatar {
                border-radius: 50%;
                margin-right: 20px;
            }
            .name {
                margin: 0 0 5px 0;
            }
            .username,
            .member-since {
                margin: 0;
            }
            .row {
                padding-left: 0;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                margin: 10px 0 0;
            }
            .row .badge {
                display: flex;
                align-items:center;
                font-size: 12px;
                margin: 0 5px 4px;
            }
            .row .badge img {
                width: 25px;
                height: 25px;
                margin-right: 5px;
            }
            </style>
        </head>
        <body>`;
        htmlResult += ('true' === link) ? `<a href="https://profiles.wordpress.org/${username}" target="_blank" title="@${username}">` : '';
        htmlResult +=  `<table class="card">
                <tr>
                    <td>
                        ${avatar}
                    </td>
                    <td>
                        <h1 class="name">${name}</h1>
                        <p class="username"><b>WordPress User:</b> @${username}</p>
                        <p class="member-since"><b>Member Since:</b> ${membersince}</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" id="badges">
                        <ul class="row">
                        ${badges}
                        </ul>
                    </td>
                </tr>
            </table>`;
            htmlResult += ('true' === link) ? `</a>` : '';
    htmlResult += `</body>
    </html>`;

    return htmlResult;
}

/**
 * 
 * @param {Badges HTML element} badges 
 * @param {Application URL} appURL 
 * @param {Display or not the badges icons} displayIcons 
 * @returns HTML list code with the badges and labels.
 */
async function renderBadgesHTML(badges, appURL, displayIcons) {
    let html = '';
    
    badges.forEach(element => {
        var badgeClass = element.class;
        var badgeName = element.name;
        badgeClass = badgeClass.substring(badgeClass.lastIndexOf("badge"), badgeClass.length).replace(' ', '-');
        badgeClass = ('true' === displayIcons) ? '<img src="'+appURL+'/static/images/badges/'+ badgeClass +'.png">' : '';
        html += '<li class="column badge">'+ badgeClass +'<label>'+badgeName+'</label></li>';
    });
    return html;
}

/**
 * 
 * @param {WordPress Profile Avatar URL} avatar 
 * @param {Display or not the WordPress Profile avatar} displayAvatar 
 * @returns HTML Img element with the avatar.
 */
async function renderAvatarHTML(avatar, displayAvatar) {
    let html = '';
    html += ('true' === displayAvatar) ? '<img class="avatar" src="'+ avatar +'" />' : '';
    return html;
}

/**
 * 
 * @param {HEX Color for the card border} color 
 * @param {Display or not the card border} displayBorder 
 * @returns CSS code for the card border.
 */
async function renderCardBorder(color, displayBorder) {
    let css = '';
    css += ('true' === displayBorder) ? 'border: 1px solid #' + color + ';' : '';
    return css;
}

module.exports = { renderBadgesHTML, renderAvatarHTML, renderCardBorder, renderCard };