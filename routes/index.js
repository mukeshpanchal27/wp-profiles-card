var express = require('express');
var router = express.Router();
var fs = require('fs');
// const db = require("../db");
const process = require("../process");
const draw  = require('../drawCard');
const nodeHtmlToImage = require('node-html-to-image')
const {
  encodeToDataUrl,
} = require('node-font2base64');

router.get('/card/:username', (req, res, next) => {
  const username = req.params.username;
  const cardFile = './public/card/' + username + '.png';

  if (fs.existsSync(cardFile)) {
    var s = fs.createReadStream(cardFile);
    s.on('open', function () {
        res.setHeader('Content-Type', 'image/png');
        s.pipe(res);
    });
  } else {
    res.render('not-found', { title: 'Card Not Found', doc: { "userName": "" }, action: '/not-found' });
  }
});

router.get('/card/generate/:username/:color?', async (req, res, next) => {
  const userName = req.params.username;
  let mainColor = req.params.color;
  let appURL = req.protocol + '://' + req.get('host');
  let userData = [];

  if (undefined === mainColor) {
    mainColor = '000000';
  }
  
  try {

    const wpURL = 'https://profiles.wordpress.org/' + userName;
    const cardURL = appURL + '/card/' + userName;

    userData = await process.processCard(wpURL, userName, appURL);

    // await db.insert('cards', { "userName" : userName, "name" : userData['name'],  "cardURL" : cardURL });
    // await draw.drawCard(userData, mainColor, appURL);

    const _fileName = './public/card/'+ userData["userName"] +'.png';
    const _fontBold = await encodeToDataUrl('./fonts/OpenSans-Bold.ttf');
    const _fontRegular = await encodeToDataUrl('./fonts/OpenSans-Regular.ttf');
    const _fontSemiBold = await encodeToDataUrl('./fonts/OpenSans-SemiBold.ttf');
    const _badgesHTML = await draw.renderBadgesHTML(userData["badges"], appURL);

    let htmlResult =  `
    <html>
        <meta charset="UTF-8">
        <head>
            <style>
            @font-face {
                font-family: 'Open Sans';
                font-display: swap;
                src: url(${_fontRegular}) format('truetype');
                font-weight: normal;
                font-style: normal;
            }
            @font-face {
                font-family: 'Open Sans';
                font-display: swap;
                src: url(${_fontSemiBold}) format('truetype');
                font-weight: 600;
                font-style: normal;
            }
            @font-face {
                font-family: 'Open Sans';
                font-display: swap;
                src: url(${_fontBold}) format('truetype');
                font-weight: 700;
                font-style: normal;
            }
            body {
                color: #${mainColor};
                font-family: 'Open Sans';
            }
            .card {
                border: 1px solid #${mainColor};
                padding:20px;
            }
            .avatar {
                border-radius: 50%;
                margin-right: 20px;
            }
            .name {
                margin: 0 0 5px 0;
            }
            .username,
            .member-since {
                margin: 0;
            }
            .row {
                padding-left: 0;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                margin: 10px 0 0;
            }
            .row .badge {
                display: flex;
                align-items:center;
                font-size: 12px;
                margin: 0 5px 4px;
            }
            .row .badge img {
                width: 25px;
                height: 25px;
                margin-right: 5px;
            }
            </style>
        </head>
        <body>
            <table class="card">
                <tr>
                    <td>
                        <img class="avatar" src="{{avatar}}" />
                    </td>
                    <td>
                        <h1 class="name">{{name}}</h1>
                        <p class="username"><b>WordPress User:</b> @{{userName}}</p>
                        <p class="member-since"><b>Member Since:</b> {{memberSince}}</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" id="badges">
                        <ul class="row">
                        ${_badgesHTML}
                        </ul>
                    </td>
                </tr>
            </table>
        </body>
    </html>`;


    if (fs.existsSync(_fileName)) {
        fs.unlinkSync(_fileName);
    }

    nodeHtmlToImage({
        output: _fileName,
        selector: '.card',
        html: htmlResult,
        content: { userName: userData["userName"], name: userData["name"], avatar: userData["avatar"], memberSince: userData["memberSince"] }
      })
     .then(() => res.redirect(cardURL))





    // res.redirect(cardURL);

    // console.log(completed);

  } catch (err) {
    next(err);
  }
});





router.get('/new', (req, res, next) => {
  res.render('new', { title: 'New card', doc: { "userName": "" }, action: '/new' });
});
router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    // const doc = await db.findOne(id);
    res.render('new', { title: 'Update card', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})
router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // const result = await db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})
router.get('/:page?', async (req, res, next) => {
  const page = parseInt(req.params.page || "1");

  try {
    // const docs = await db.findAll(page);
    // const count = await db.countAll();
    // const numPages = Math.ceil(count / db.PAGE_SIZE);
    // res.render('index', { title: 'Profiles Card', docs, count, numPages, page });
  } catch (err) {
    next(err);
  }
})

router.post('/new', async (req, res, next) => {
  const userName = req.body.userName;
  const mainColor = req.body.mainColor;
  var appURL = req.protocol + '://' + req.get('host');

  try {

    const URL = 'https://profiles.wordpress.org/' + userName;

    userData = await process.processCard(URL, userName, mainColor, appURL);

    // const result = await db.insert('cards', { "userName" : userName, "name" : userData['name'], "avatar" : userData['avatar'], "memberSince" : userData['memberSince'] });
    // console.log(result.insertedId);


    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const userName = req.body.userName;

  try {
    // const result = await db.update(id, { userName });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

module.exports = router;