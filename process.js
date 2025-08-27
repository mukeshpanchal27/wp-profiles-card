require("dotenv").config();
const cheerio = require('cheerio');
const http    = require('https');
const axios   = require('axios');
const fs      = require('fs');
const path    = require('path');

const MEASUREMENT_ID = process.env.GA_API;
const API_SECRET = process.env.GA_API_SECRET;

/**
 * Class to process WordPress user profiles and grab relevant data.
 */
class Process {
  
  /** Default WordPress Profile URL */
  static URL = "https://profiles.wordpress.org/";

  /**
   * 
   * @param {WordPress User Profile Name} username 
   */
  constructor(username) {
    this.username = username;
  }

  /**
   * 
   * @returns String with the crawl HTML code
   */
  async getData() {
    return axios.get(Process.URL.concat(this.username));
  }

  /**
   * 
   * @param {GA Session name} clientId 
   * @param {GA Event name} eventName 
   * @param {GA Event parameters} eventParams 
   */
  static async trackEvent(clientId, eventName, eventParams = {}) {
    try {
      const payload = {
        client_id: clientId || "backend", // unique ID for the user/session
        events: [
          {
            name: eventName,
            params: eventParams,
          },
        ],
      };

      await axios.post(
        `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
        payload
      );

      console.log("Event sent:", eventName);
    } catch (err) {
      console.error("Error sending event:", err.response?.data || err.message);
    }
  }

  /**
   * 
   * @returns Array with WordPress user profile information to load the card.
   */
  async processCard() {
    const html = await this.getData();
    const $    = cheerio.load(html.data); 
    let user   = {};
    let badges = [];

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
    user["userName"]    = this.username;
    user["name"]        = name;
    user["avatar"]      = avatar;
    user["memberSince"] = memberSince;
    user["badges"]      = badges;

    return user;
  }

  /**
   * 
   * @param {Main directory path} dirPath 
   * @returns Array with directories in the main directory path sorted by creation date
   */
  static getDirectories(dirPath) {
    try {
      return fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {
          const fullPath = path.join(dirPath, dirent.name);
          const stats = fs.statSync(fullPath);
          return {
            name: dirent.name,
            created: stats.birthtime,
          };
        })
        .sort((a, b) => a.created.getTime() - b.created.getTime())
        .map(item => item.name);
    } catch (err) {
      console.error("Error reading directory:", err);
      return [];
    }
  }

  /**
   * 
   * @param {Directory path} dirPath 
   * @returns Date and time of the directory creation
   */
  static getDirectoryDateTime(dirPath) {
    try {
      const stats = fs.statSync(dirPath);
      if (stats.isDirectory()) {
        const date = new Date(stats.mtime);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return { date: formattedDate, time: formattedTime };
      } else {
        return 'Not a directory';
      }
    } catch (error) {
      console.error("Error reading directory date and time:", err);
    }
  }
}

module.exports = { Process };