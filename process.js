const cheerio = require('cheerio');
require("dotenv").config();
const http = require('https');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {URL to crawl the content} URL
 * @returns String with the crawl HTML code
 */
async function getData(URL) {
  return axios.get(URL);
}

/**
 * 
 * @param {URL to crawl the content} URL
 * @param {WordPress profile username} userName
 * @returns Array with WordPress user profile information to load the card.
 */
async function processCard(URL, userName) {
  const html     = await getData(URL);
  const $        = cheerio.load(html.data); 
  let user       = [];
  let badges     = [];

  // Extracting name, avatar, and member since fields
  const name        = $('header.site-header').find('h2 a').text();
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

function getDirectories(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    const directories = files.filter(file => {
      return fs.statSync(path.join(dirPath, file)).isDirectory();
    });
    return directories;
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
}

module.exports = { processCard, getDirectories };