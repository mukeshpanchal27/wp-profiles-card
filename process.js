const request = require('request-promise');
const cheerio = require('cheerio');
require("dotenv").config();

/**
 * 
 * @param {URL to crawl the content} URL
 * @returns String with the crawl HTML code
 */
async function getData(URL) {
  const response = await request(URL);
  let $ = cheerio.load(response);
  return $;
}

/**
 * 
 * @param {URL to crawl the content} URL
 * @param {WordPress profile username} userName
 * @returns Array with WordPress user profile information to load the card.
 */
async function processCard(URL, userName) {
  const $    = await getData(URL);
  let user   = [];
  let badges = [];

  // Extracting name, avatar, and member since fields
  const name        = $('header.site-header').find('.fn a').text();
  const avatar      = $('header.site-header').find('img.avatar').attr('src');
  const memberSince =  $('#user-meta li').find('#user-member-since strong').text();

  // Extracting profile badges
  $('#user-badges li').each((i, item) => {
    const badge = {
      class: $(item).find('.badge').attr('class'),
      name: $(item).text().trim()
    }
    if(badge.name !== "")
      badges.push(badge)
  })

  // Assigning values - Loading the array
  user["userName"]    = userName;
  user["name"]        = name;
  user["avatar"]      = avatar;
  user["memberSince"] = memberSince;
  user["badges"]      = badges;

  return user;
}

module.exports = { processCard };