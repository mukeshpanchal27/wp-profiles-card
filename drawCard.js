const fs = require('fs');

function renderCard(username, name, initials, membersince, avatar, badges, dynHeight) {
    let htmlResult =  `
<svg width="500" height="${dynHeight}" viewBox="0 0 500 ${dynHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
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
.achievement {
    opacity: 0;
    animation: fadeInAnim 0.3s ease-in-out forwards;
}
.label {
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
  <rect x="0" y="0" rx="4.5" height="99%" stroke="#e4e2e2" width="99%" fill="#ffffff" stroke-opacity="1" />
    <g xmlns="http://www.w3.org/2000/svg" class="card-title" transform="translate(25, 35)">
        <g transform="translate(0, -15)">
        <svg width="100" height="100">
            <circle cx="50" cy="50" r="50%" stroke="#e4e2e2" fill="#ffffff" stroke-opacity="1" />
            <text x="26" y="63" class="initials">${initials}</text>
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

/**
 * 
 * @param {Badges HTML element} badges
 * @param {displayBadges} display or not the badges
 * @returns HTML list code with the badges and labels.
 */
async function renderBadgesSVG(badges, displayBadges) {
    let htmlResult      = '';
    let elementPostionY = 2;
    let itemCount       = 0;

    badges.forEach(element => {
        let elementPostionX = (itemCount % 2 == 0) ? 0 : 210;
        var iconClass = element.class;
        var badgeName = element.name;
        badgeClass = iconClass.substring(iconClass.lastIndexOf("badge"), iconClass.lastIndexOf(" ")).replace(' ', '-');
        dashClass = iconClass.substring(iconClass.lastIndexOf("dashicons"), iconClass.length).replace(' ', '-');
        const iconPath = `./public/images/svg/${dashClass}.svg`;
        htmlResult += `
        <g transform="translate(${elementPostionX}, ${elementPostionY})" class="col">
            <g class="achievement" style="animation-delay: 450ms" transform="translate(25, 0)">
                <svg viewBox="0 0 24 24" width="24" height="24" overflow="visible" class="${iconClass}">
                    <circle cx="12" cy="12" r="50%" />
                    ${fs.readFileSync(iconPath, { encoding: 'utf8', flag: 'r' })}
                </svg>
                <text class="label  bold" x="35" y="17">${badgeName}</text>
            </g>
        </g>`;

        elementPostionY += (itemCount % 2 != 0) ? 30 : 0 ;
        itemCount += 1;
    });
    return ('true' === displayBadges) ? htmlResult : '';
}

/**
 * 
 * @param {WordPress Profile Avatar URL} avatar 
 * @param {Display or not the WordPress Profile avatar} displayAvatar 
 * @returns HTML Img element with the avatar.
 */
async function renderAvatarSVG(avatar_url, displayAvatar) {
// 	let html = '';
// 	var request = require('request').defaults({ encoding: null });

// 	request.get(avatar_url, function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
// 			data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
// 			html = '<image href="'+ data +'" height="100" width="100" style="clip-path: inset(2px 2px round 50%);" stroke="#e4e2e2" stroke-opacity="1" />';
			
// 			console.log(data);
// 		}
// 	});

// return html;
	let html         = '';
	html = ('true' === displayAvatar) ? '<image href="data:image/jpeg;base64,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" height="100" width="100" style="clip-path: inset(2px 2px round 50%);" stroke="#e4e2e2" stroke-opacity="1" />' : '';
	return html;
}

module.exports = { renderBadgesSVG, renderAvatarSVG, renderCard };