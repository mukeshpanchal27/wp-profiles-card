const request = require('request-promise');
const cheerio = require('cheerio');
require("dotenv").config();
const http = require('https');
const axios = require('axios');


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

async function f1(url) {
  var x = await getAvatar(url);
  console.log(x); // 10
}

// f1();

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

module.exports = { processCard, loadImageAndConvertToBase64, f1 }; // getAvatarBase64, , deleteSavedAvatar };