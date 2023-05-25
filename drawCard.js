async function renderBadgesHTML(badges, appURL) {
    let html = '';
    badges.forEach(element => {
        var badgeClass = element.class;
        var badgeName = element.name;
        badgeClass = badgeClass.substring(badgeClass.lastIndexOf("badge"), badgeClass.length).replace(' ', '-');
        html += '<li class="column badge"><img src="'+appURL+'/static/images/badges/'+ badgeClass +'.png"><label>'+badgeName+'</label></li>';
    });
    return html;
}

module.exports = { renderBadgesHTML };