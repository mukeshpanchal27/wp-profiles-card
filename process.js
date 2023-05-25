/*
https://wordpress.org/plugins/classic-editor/
badge-code: rgb(205, 0, 0)
badge-code-committer: rgb(205, 0, 0)
badge-plugins: rgb(240, 103, 35)
badge-themes: rgb(78, 50, 136)
badge-documentation-contributor: rgb(59, 114, 54)
badge-community: rgb(17, 121, 157)
badge-community-contributor: rgb(17, 121, 157)
badge-organizer dashicons-nametag: rgb(247, 173, 67)
badge-organizer dashicons-tickets: rgb(247, 173, 67)
badge-photos-team: rgb(59, 114, 54)
badge-speaker: rgb(247, 173, 67)
badge-translation-contributor: rgb(195, 34, 131)
badge-translation-editor: rgb(195, 34, 131)
badge-pattern-author: rgb(146, 75, 179)
badge-patterns-team: rgb(146, 75, 179)
badge-meta: rgb(174, 173, 173)
badge-meta-contributor: rgb(174, 173, 173)
badge-accessibility-contributor: rgb(17, 121, 157)
badge-bbpress-contributor: rgb(45, 142, 66)
badge-design-contributor: rgb(238, 194, 106)
badge-design: rgb(238, 194, 106)
badge-test: rgb(0, 128, 128)
badge-test-contributor: rgb(0, 128, 128)
badge-training-contributor: rgb(233, 192, 45)
badge-wordpress-tv-contributor: rgb(115, 173, 48)
badge-hosting-contributor: rgb(83, 88, 166)
badge-security-contributor: rgb(0, 204, 58)
badge-marketing-contributor: rgb(71, 190, 167)
*/

const request = require('request-promise');
const cheerio = require('cheerio');
require("dotenv").config();

async function getData(URL) {
  const response = await request(URL);
  let $ = cheerio.load(response);
  return $;
}

async function processCard(URL, userName, appURL) {
  const $ = await getData(URL);
  let user = [];
  let badges = [];

  const name = $('header.site-header').find('.fn a').text();
  const avatar = $('header.site-header').find('img.avatar').attr('src');
  const memberSince =  $('#user-meta li').find('#user-member-since strong').text();

  // Badges
  $('#user-badges li').each((i, item) => {
    const badge = {
      class: $(item).find('.badge').attr('class'),
      name: $(item).text().trim()
    }
    if(badge.name !== "")
      badges.push(badge)
  })

  user["userName"] = userName;
  user["name"] = name;
  user["avatar"] = avatar;
  user["memberSince"] = memberSince;
  user["badges"] = badges;

  return user;
}


module.exports = { processCard };