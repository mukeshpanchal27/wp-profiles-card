var express = require('express');
var router = express.Router();
var fs = require('fs');
const process = require("../process");
const draw  = require('../drawCard');
const nodeHtmlToImage = require('node-html-to-image')
const {
  encodeToDataUrl,
} = require('node-font2base64');
const matter = require("gray-matter");
const md = require("markdown-it")({ html: true });

/**
 * Generate card
 * Params: {
 *  username: string
 *  color: string HEX color
 *  foreground: string HEX color
 *  badges: boolean
 *  avatar: boolean
 *  format: string [html|image]
 *  border: boolean
 *  link: boolean
 * }
 */
router.get('/card', async (req, res, next) => {
  let username      = req.query.username;
  let color         = (undefined === req.query.color) ? '000000' : req.query.color;
  let foreground    = (undefined === req.query.foreground) ? 'ffffff' : req.query.foreground;
  let displayBadges = (undefined === req.query.badges) ? 'true' : req.query.badges;
  let displayAvatar = (undefined === req.query.avatar) ? 'true' : req.query.avatar;
  let displayBorder = (undefined === req.query.border) ? 'true' : req.query.border;
  let format        = (undefined === req.query.format) ? 'html' : req.query.format;
  let link          = (undefined === req.query.link) ? 'false' : req.query.link;
  let appURL        = req.protocol + '://' + req.get('host');
  let userData      = [];

  try {

    const wpURL   = 'https://profiles.wordpress.org/' + username;
    const cardURL = appURL + '/card/?username=' + username;

    userData = await process.processCard(wpURL, username);

    const cardFile      = './public/card/'+ userData["userName"] +'.png';
    const fonts         = [await encodeToDataUrl('./fonts/OpenSans-Bold.ttf'), await encodeToDataUrl('./fonts/OpenSans-Regular.ttf'), await encodeToDataUrl('./fonts/OpenSans-SemiBold.ttf')]
    const css           = [color, foreground, await draw.renderCardBorder(color, displayBorder)];
    const name          = userData["name"];
    const membersince   = userData["memberSince"];
    const avatar        = await draw.renderAvatarHTML(userData["avatar"], displayAvatar);
    const badges        = await draw.renderBadgesHTML(userData["badges"], appURL, displayBadges);

    let htmlResult = await draw.renderCard(fonts, css, username, name, membersince, avatar, badges, link);

    if ('image' === format) {

      // Always recreate the image card.
      if (fs.existsSync(cardFile)) {
        fs.unlinkSync(cardFile);
      }

      // Render the image card.
      nodeHtmlToImage({
          output: cardFile,
          selector: '.card',
          html: htmlResult,
        })
      .then(() => {
        if (fs.existsSync(cardFile)) {
          var s = fs.createReadStream(cardFile);
          s.on('open', function () {
              res.setHeader('Content-Type', 'image/png');
              s.pipe(res);
          });
        } else {
          res.render('user-not-found', { title: 'User Not Found', userName: username, appURL: appURL });
        }

      })
    } else {
      res.render('card', { card: htmlResult });
    }

  } catch (err) {
    res.render('user-not-found', { title: 'User Not Found', userName: username, appURL: appURL });
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