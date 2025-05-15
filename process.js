const request = require('request-promise');
const cheerio = require('cheerio');
require("dotenv").config();
const http = require('https');
const axios = require('axios');
const fs = require('fs');


async function fetchImageAsBase64(url) {
  const response = await fetch(url); // Native fetch in Node 18+
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const contentType = response.headers.get('content-type');
  return `data:${contentType};base64,${base64}`;
}

async function createSVGWithImage(imageUrl, userName) {
  try {
    const imageDataURI = await fetchImageAsBase64(imageUrl);

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
        <image href="${imageDataURI}" x="0" y="0" width="800" height="600"/>
      </svg>`;

    fs.writeFileSync('public/images/avatar/' + userName + '.svg', svgContent);
    svgContent
    console.log('✅ SVG created with embedded image.');
  } catch (err) {
    console.error('❌ Error creating SVG:', err);
  }
}

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
  const name        = $('header.site-header').find('h2 a').text();
  const avatar      = $('header.site-header').find('img.avatar').attr('src');
  const memberSince =  $('#user-meta li').find('#user-member-since strong').text();

  // createSVGWithImage(avatar, userName);

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

function printError(error) {
  console.error(error.message);
}

function getAvatar(url) {
  return new Promise(resolve => {
    setTimeout(() => {
        resolve(url);
    }, 2000);
    // try {
    //   const response =  axios.get(url, { responseType: 'arraybuffer' });
    //   const imageBuffer = Buffer.from(response.data, 'binary');
    //   const base64Image = imageBuffer.toString('base64');
    //   return base64Image;
    // } catch (error) {
    //     console.error('Error loading image:', error.message);
    //     throw error;
    // }

  });
}

async function loadImageAndConvertToBase64(url) {
  try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');
      const base64Image = imageBuffer.toString('base64');
      return base64Image;
  } catch (error) {
      console.error('Error loading image:', error.message);
      throw error;
  }
}


async function tempSaveAvatar(avatar_url, username) {
  let html = '';
  var avatar = '';
  
  http.get(avatar_url, (resp) => {
    resp.setEncoding('base64');
    // avatar = "data:" + resp.headers["content-type"] + ";base64,";
    resp.on('data', (data) => { 
      avatar += data
    });
    resp.on('end', () => {
      try {
        // Parse the data
        return avatar;
        // fs.writeFileSync('./public/temp/' + username + '.jpeg', buff);
    } catch (error) {
        // Parse Error
        printError(error);
    }
    });
  })
  .on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    return '';
  });

  function getAvatarBase64() {
    try {
      return avatar
    } catch (error) {
      printError(error);
    }
  }

  return getAvatarBase64;
}

// async function deleteSavedAvatar(username) {
//   try {
//     fs.unlinkSync('./public/temp/' + username + '.jpeg');
  
//     console.log("Delete File successfully.");
//   } catch (error) {
//     console.log(error);
//   }

// }


// async function getAvatarBase64(username) {

//   try {
//     let buff = fs.readFileSync('./public/temp/' + username + '.jpeg');
//     let base64data = buff.toString('base64');
//     return base64data
//   } catch (error) {
//     // Parse Error
//     printError(error);
//   }
// }

module.exports = { processCard, loadImageAndConvertToBase64, createSVGWithImage }; // getAvatarBase64, , deleteSavedAvatar };