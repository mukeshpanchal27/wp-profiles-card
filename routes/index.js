var express = require('express');
var router = express.Router();
const process = require("../process");
const draw  = require('../drawCard');
const matter = require("gray-matter");
const md = require("markdown-it")({ html: true });
const path = require('path');
const fs = require('fs');

/**
 * Generate card
 * Params: {
 *  username: string
 *  color: string HEX color
 *  foreground: string HEX color
 *  badges: boolean
 *  avatar: boolean
 * }
 */
router.get('/card', async (req, res, next) => {
  let username      = req.query.username;
  let color         = (undefined === req.query.color) ? '000000' : req.query.color;
  let foreground    = (undefined === req.query.foreground) ? 'ffffff' : req.query.foreground;
  let displayBadges = (undefined === req.query.badges) ? 'true' : req.query.badges;
  let displayAvatar = (undefined === req.query.avatar) ? 'true' : req.query.avatar;
  let appURL        = req.protocol + '://' + req.get('host');
  let userData      = [];

  try {
    const wpURL   = 'https://profiles.wordpress.org/' + username;

    userData = await process.processCard(wpURL, username);

    const name          = userData["name"];
    const initials      = name.charAt(0) + name.substring(name.lastIndexOf(" ") + 1 ).charAt(0);
    const membersince   = userData["memberSince"];
    let avatar          = userData["avatar"];


    // process.loadImageAndConvertToBase64(userData["avatar"])
    // .then(base64Image => {
    //     // You can save the base64 image to a file if needed
    //     const outputPath = path.join(__dirname, 'outputImage.txt');
    //     avatar     = "data:text/plain;base64,";
    //     fs.writeFileSync(outputPath, base64Image, 'utf-8');
    //     avatar     += draw.renderAvatarSVG(base64Image, 'true');
    //     // console.log(avatar);
        
    //     console.log('Image successfully loaded and saved as base64.');
    // })
    // .catch(err => {
    //     console.error('An error occurred:', err.message);
    // });

    const badges        = await draw.renderBadgesSVG(userData["badges"], displayBadges);
    const badgesCount   = userData["badges"].length;
    const defaultHeight = 145;
    const dynHeight     = defaultHeight + (32 * Math.floor((badgesCount > 4) ? badgesCount / 2 : badgesCount)) + ((badgesCount % 2 === 0) ? 0 : 30);
    // const avatar        = await draw.renderAvatarSVG(avatarBase64, displayAvatar);

    // console.log(draw.tempSaveAvatar(userData["avatar"], username));

    let htmlResult = await draw.renderCard(username, name, initials, membersince, avatar, badges, dynHeight);

    res.setHeader(
      'Content-Security-Policy',
      "img-src 'self' data:"
    );
    res.setHeader('Content-Type', "image/svg+xml");
    res.render('card', { card: htmlResult });

  } catch (err) {
    res.render('user-not-found', { title: 'User Not Found', userName: username, appURL: appURL, error: err });
  }
});

/**
 * Only for index now.
 */
router.get('/:page?', async (req, res, next) => {
  // const page = parseInt(req.params.page || "1");

  try {
    const readme  = matter.read(__basedir + "/readme.md");
    const content = readme.content;
    const html    = md.render(content);

    res.render('index', { title: 'Welcome to CardPress - WordPress Profile Card', postContent: html });
  } catch (err) {
    next(err);
  }
});

module.exports = router;