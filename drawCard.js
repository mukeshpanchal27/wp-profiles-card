const fs = require('fs');

async function renderCard(username, name, membersince, avatar, badges) {
    let htmlResult =  `
<svg width="500" height="275" viewBox="0 0 500 275" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
<style type="text/css" >
<![CDATA[
.name {
    font: 700 20px 'Segoe UI', Ubuntu, Sans-Serif;
    fill: #191E23;
    animation: fadeInAnim 0.8s ease-in-out forwards;
}

.subheader {
    font: 500 16px 'Segoe UI', Ubuntu, Sans-Serif;
    fill: #82878C;
    animation: fadeInAnim 0.8s ease-in-out forwards;
}
.initials {
    font: 700 40px 'Segoe UI', Ubuntu, Sans-Serif;
    fill: #191E23;
}
.stagger {
    opacity: 0;
    animation: fadeInAnim 0.3s ease-in-out forwards;
}
.stat {
    font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
    fill: #23282D;
}
@keyframes fadeInAnim {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
.row {
    display: flex;
}
  
.row .col {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 5px;
}

.badge-themes-reviewer circle {
	fill: rgba(78, 50, 136, 0.25);
	stroke: rgb(78, 50, 136);
	stroke-width: 3px;
}
.badge-themes-reviewer svg path {
	fill: rgb(78, 50, 136);
}

.badge-themes circle {
	fill: white;
	stroke: rgb(78, 50, 136);
	stroke-width: 3px;
}
.badge-themes svg path {
	fill: rgb(78, 50, 136);
}

.badge-plugins-reviewer circle {
	fill: rgba(240, 103, 35, 0.25);
	stroke: rgb(240, 103, 35);
	stroke-width: 3px;
}
.badge-plugins-reviewer svg path {
	fill: rgb(240, 103, 35);
}

.badge-plugins circle {
	fill: white;
	stroke: rgb(240, 103, 35);
	stroke-width: 3px;
}
.badge-plugins svg path {
	fill: rgb(240, 103, 35);
}

.badge-community circle {
	fill: rgba(17, 121, 157, 0.25);
	stroke: rgb(17, 121, 157);
	stroke-width: 3px;
}
.badge-community svg path {
	fill: rgb(17, 121, 157);
}

.badge-community-contributor circle {
	fill: white;
	stroke: rgb(17, 121, 157);
	stroke-width: 3px;
}
.badge-community-contributor svg path {
	fill: rgb(17, 121, 157);
}

.badge-meta circle {
	fill: rgba(174, 173, 173, 0.25);
	stroke: rgb(174, 173, 173);
	stroke-width: 3px;
}
.badge-meta svg path {
	fill: rgb(174, 173, 173);
}

.badge-meta-contributor circle {
	fill: white;
	stroke: rgb(174, 173, 173);
	stroke-width: 3px;
}
.badge-meta-contributor svg path {
	fill: rgb(174, 173, 173);
}

.badge-code-committer circle {
	fill: rgba(205, 0, 0, 0.25);
	stroke: rgb(205, 0, 0);
	stroke-width: 3px;
}
.badge-code-committer svg path {
	fill: rgb(205, 0, 0);
}

.badge-code circle {
	fill: white;
	stroke: rgb(205, 0, 0);
	stroke-width: 3px;
}
.badge-code svg path {
	fill: rgb(205, 0, 0);
}

.badge-support circle {
	fill: rgba(51, 180, 206, 0.25);
	stroke: rgb(51, 180, 206);
	stroke-width: 3px;
}
.badge-support svg path {
	fill: rgb(51, 180, 206);
}

.badge-support-contributor circle {
	fill: white;
	stroke: rgb(51, 180, 206);
	stroke-width: 3px;
}
.badge-support-contributor svg path {
	fill: rgb(51, 180, 206);
}

.badge-wordpress-tv circle {
	fill: rgba(115, 173, 48, 0.25);
	stroke: rgb(115, 173, 48);
	stroke-width: 3px;
}
.badge-wordpress-tv svg path {
	fill: rgb(115, 173, 48);
}

.badge-wordpress-tv-contributor circle {
	fill: white;
	stroke: rgb(115, 173, 48);
	stroke-width: 3px;
}
.badge-wordpress-tv-contributor svg path {
	fill: rgb(115, 173, 48);
}

.badge-organizer circle {
	fill: white;
	stroke: rgb(247, 173, 67);
	stroke-width: 3px;
}
.badge-organizer svg path {
	fill: rgb(247, 173, 67);
}

.badge-speaker circle {
	fill: white;
	stroke: rgb(247, 173, 67);
	stroke-width: 3px;
}
.badge-speaker svg path {
	fill: rgb(247, 173, 67);
}

.badge-accessibility circle {
	fill: rgba(17, 121, 157, 0.25);
	stroke: rgb(17, 121, 157);
	stroke-width: 3px;
}
.badge-accessibility svg path {
	fill: rgb(17, 121, 157);
}

.badge-accessibility-contributor circle {
	fill: white;
	stroke: rgb(17, 121, 157);
	stroke-width: 3px;
}
.badge-accessibility-contributor svg path {
	fill: rgb(17, 121, 157);
}

.badge-documentation circle {
	fill: rgba(59, 114, 54, 0.25);
	stroke: rgb(59, 114, 54);
	stroke-width: 3px;
}
.badge-documentation svg path {
	fill: rgb(59, 114, 54);
}

.badge-documentation-contributor circle {
	fill: white;
	stroke: rgb(59, 114, 54);
	stroke-width: 3px;
}
.badge-documentation-contributor svg path {
	fill: rgb(59, 114, 54);
}

.badge-mobile circle {
	fill: rgba(251, 161, 108, 0.25);
	stroke: rgb(251, 161, 108);
	stroke-width: 3px;
}
.badge-mobile svg path {
	fill: rgb(251, 161, 108);
}

.badge-training circle {
	fill: rgba(233, 192, 45, 0.25);
	stroke: rgb(233, 192, 45);
	stroke-width: 3px;
}
.badge-training svg path {
	fill: rgb(233, 192, 45);
}

.badge-training-contributor circle {
	fill: white;
	stroke: rgb(233, 192, 45);
	stroke-width: 3px;
}
.badge-training-contributor svg path {
	fill: rgb(233, 192, 45);
}

.badge-translation-editor circle {
	fill: rgba(195, 34, 131, 0.25);
	stroke: rgb(195, 34, 131);
	stroke-width: 3px;
}
.badge-translation-editor svg path {
	fill: rgb(195, 34, 131);
}

.badge-translation-contributor circle {
	fill: white;
	stroke: rgb(195, 34, 131);
	stroke-width: 3px;
}
.badge-translation-contributor svg path {
	fill: rgb(195, 34, 131);
}

.badge-design circle {
	fill: rgba(238, 194, 106, 0.25);
	stroke: rgb(238, 194, 106);
	stroke-width: 3px;
}
.badge-design svg path {
	fill: rgb(238, 194, 106);
}

.badge-design-contributor circle {
	fill: white;
	stroke: rgb(238, 194, 106);
	stroke-width: 3px;
}
.badge-design-contributor svg path {
	fill: rgb(238, 194, 106);
}

.badge-marketing circle {
	fill: rgba(71, 190, 167, 0.25);
	stroke: rgb(71, 190, 167);
	stroke-width: 3px;
}
.badge-marketing svg path {
	fill: rgb(71, 190, 167);
}

.badge-marketing-contributor circle {
	fill: white;
	stroke: rgb(71, 190, 167);
	stroke-width: 3px;
}
.badge-marketing-contributor svg path {
	fill: rgb(71, 190, 167);
}

.badge-wp-cli circle {
	fill: rgba(66, 66, 66, 0.25);
	stroke: rgb(66, 66, 66);
	stroke-width: 3px;
}
.badge-wp-cli svg path {
	fill: rgb(66, 66, 66);
}

.badge-wp-cli-contributor circle {
	fill: white;
	stroke: rgb(66, 66, 66);
	stroke-width: 3px;
}
.badge-wp-cli-contributor svg path {
	fill: rgb(66, 66, 66);
}

.badge-hosting circle {
	fill: rgba(83, 88, 166, 0.25);
	stroke: rgb(83, 88, 166);
	stroke-width: 3px;
}
.badge-hosting svg path {
	fill: rgb(83, 88, 166);
}

.badge-hosting-contributor circle {
	fill: white;
	stroke: rgb(83, 88, 166);
	stroke-width: 3px;
}
.badge-hosting-contributor svg path {
	fill: rgb(83, 88, 166);
}

.badge-tide circle {
	fill: rgba(21, 38, 255, 0.25);
	stroke: rgb(21, 38, 255);
	stroke-width: 3px;
}
.badge-tide svg path {
	fill: rgb(21, 38, 255);
}

.badge-tide-contributor circle {
	fill: white;
	stroke: rgb(21, 38, 255);
	stroke-width: 3px;
}
.badge-tide-contributor svg path {
	fill: rgb(21, 38, 255);
}

.badge-security-team,
.badge-security-contributor circle {
	fill: rgba(0, 204, 58, 0.25);
	stroke: rgb(0, 204, 58);
	stroke-width: 3px;
}

.badge-security-team svg path,
.badge-security-contributor svg path {
	fill: rgb(0, 204, 58);
}

.badge-security-contributor circle {
	fill: unset;
}

.badge-bbpress circle {
	fill: rgba(45, 142, 66, 0.25);
	stroke: rgb(45, 142, 66);
	stroke-width: 3px;
}
.badge-bbpress svg path {
	fill: rgb(45, 142, 66);
}

.badge-bbpress-contributor circle {
	fill: white;
	stroke: rgb(45, 142, 66);
	stroke-width: 3px;
}
.badge-bbpress-contributor svg path {
	fill: rgb(45, 142, 66);
}

.badge-buddypress circle, .badge-buddypress-contributor circle {
	stroke: rgb(216, 72, 0);
}

.badge-buddypress circle{
	fill: rgb(216, 72, 0, 0.25);
}

.badge-test circle {
	fill: rgba(0, 128, 128, 0.25);
	stroke: rgb(0, 128, 128);
	stroke-width: 3px;
}
.badge-test svg path {
	fill: rgb(0, 128, 128);
}

.badge-test-contributor circle {
	fill: white;
	stroke: rgb(0, 128, 128);
	stroke-width: 3px;
}
.badge-test-contributor svg path {
	fill: rgb(0, 128, 128);
}

.badge-openverse circle {
	fill: rgba(197, 43, 155, 0.25);
	stroke: rgb(197, 43, 155);
	stroke-width: 3px;
}
.badge-openverse svg path {
	fill: rgb(197, 43, 155);
}

.badge-openverse-contributor circle {
	fill: white;
	stroke: rgb(197, 43, 155);
	stroke-width: 3px;
}
.badge-openverse-contributor svg path {
	fill: rgb(197, 43, 155);
}

.badge-patterns-team,
.badge-pattern-author circle {
	fill: rgba(146, 75, 179, 0.25);
	stroke: rgb(146, 75, 179);
	stroke-width: 3px;
}
.badge-pattern-author circle {
	fill: white;
}
.badge-patterns-team svg path,
.badge-pattern-author svg path {
	fill: rgb(146, 75, 179);
}

.badge-photos-team circle,
.badge-photo-contributor circle {
	fill: rgba(59, 114, 54, 0.25);
	stroke: rgb(59, 114, 54);
	stroke-width: 3px;
}
.badge-photo-contributor circle {
	fill: white;
}
.badge-photos-team svg path,
.badge-photo-contributor svg path {
	fill: rgb(59, 114, 54);
}

.badge-performance-team circle {
	fill: rgba(0, 115, 170, 0.25);
	stroke: rgb(0, 115, 170);
	stroke-width: 3px;
}
.badge-performance-team svg path {
	fill: rgb(0, 115, 170);
}

.badge-performance-contributor circle {
	fill: white;
	stroke: rgb(0, 115, 170);
	stroke-width: 3px;
}
.badge-performance-contributor svg path {
	fill: rgb(0, 115, 170);
}
]]>
</style>
<link rel="stylesheet" href="https://profiles.wordpress.org/wp-includes/css/dashicons.min.css" type="text/css" />
  <rect x="0" y="0" rx="4.5" height="99%" stroke="#e4e2e2" width="99%" fill="#ffffff" stroke-opacity="1" />
    <g xmlns="http://www.w3.org/2000/svg" class="card-title" transform="translate(25, 35)">
        <g transform="translate(0, -15)">
        <svg width="100" height="100">
            <circle cx="50" cy="50" r="50%" stroke="#e4e2e2" fill="#ffffff" stroke-opacity="1" />
            <text x="26" y="63" class="initials">RD</text>
            ${avatar}
        </svg>
        </g>
        <g transform="translate(110, 20)">
            <text x="0" y="0" class="name">${name} WordPress Activity</text>
            <text x="0" y="25" class="subheader">WordPress User: @${username}</text>
            <text x="0" y="45" class="subheader">Member Since: ${membersince}</text>
        </g>
    </g>
    <g class="badges" transform="translate(0, 140)">
        <svg viewBox="0 0 430 400" width="430" height="400" overflow="visible" class="row">
            ${badges}
        </svg>
    </g>
</svg>`;

return htmlResult;
}

async function renderCardHtml(fonts, css, username, name, membersince, avatar, badges, link) {

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
async function renderBadgesSVG(badges, appURL, displayIcons) {
    let htmlResult = '';
    let elementPostion = 2;
    
    
    badges.forEach(element => {
        var iconClass = element.class;
        var badgeName = element.name;
        badgeClass = iconClass.substring(iconClass.lastIndexOf("badge"), iconClass.lastIndexOf(" ")).replace(' ', '-');
        dashClass = iconClass.substring(iconClass.lastIndexOf("dashicons"), iconClass.length).replace(' ', '-');
        const iconPath = `./public/images/svg/${dashClass}.svg`;

        // badgeClass = ('true' === displayIcons) ? '<img src="'+appURL+'/static/images/badges/'+ badgeClass +'.png">' : '';
        htmlResult += `
        <g transform="translate(0, ${elementPostion})" class="col">
            <g class="stagger" style="animation-delay: 450ms" transform="translate(25, 0)">
                <svg viewBox="0 0 24 24" width="24" height="24" overflow="visible" class="${iconClass}">
                    <circle cx="12" cy="12" r="50%" />
                    ${fs.readFileSync(iconPath, { encoding: 'utf8', flag: 'r' })}
                </svg>
                <text class="stat  bold" x="35" y="17">${badgeName}</text>
            </g>
        </g>`;

        elementPostion += 30;
    });
    return htmlResult;
}

/**
 * 
 * @param {WordPress Profile Avatar URL} avatar 
 * @param {Display or not the WordPress Profile avatar} displayAvatar 
 * @returns HTML Img element with the avatar.
 */
async function renderAvatarHTML(avatar, displayAvatar) {
    let html = '';
    html += ('true' === displayAvatar) ? '<image href="'+ avatar.replace(/&/g, '&amp;') +'" height="100" width="100" style="clip-path: inset(2px 2px round 50%);" stroke="#e4e2e2" stroke-opacity="1" />' : '';
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

module.exports = { renderBadgesSVG, renderAvatarHTML, renderCardBorder, renderCard };