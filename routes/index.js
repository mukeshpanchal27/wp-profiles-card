var express = require('express');
var router = express.Router();
const process = require("../process");
const draw  = require('../drawCard');
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
    const membersince   = userData["memberSince"];
    const avatar        = await draw.renderAvatarSVG(userData["avatar"], displayAvatar);
    const badges        = await draw.renderBadgesSVG(userData["badges"], displayBadges);

    let htmlResult = await draw.renderCard(username, name, membersince, avatar, badges);

    res.setHeader(
      'Content-Security-Policy',
      "img-src 'self' https://secure.gravatar.com/;"
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