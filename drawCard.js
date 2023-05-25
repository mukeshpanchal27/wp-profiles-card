


async function renderBadgesHTML(badges, appURL) {
    let html = '';
    badges.forEach(element => {
        var badgeClass = element.class;
        var badgeName = element.name;
        badgeClass = badgeClass.substring(badgeClass.lastIndexOf("badge"), badgeClass.length).replace(' ', '-');
        html += '<li class="column badge"><img src="'+appURL+'/static/images/badges/'+ badgeClass +'.png"><label>'+badgeName+'</label></li>';
    });
    return html;
}

// async function drawCard(userData, mainColor, appURL) {
//     const _fileName = './public/card/'+ userData["userName"] +'.png';
//     const _fontBold = await encodeToDataUrl('./fonts/OpenSans-Bold.ttf');
//     const _fontRegular = await encodeToDataUrl('./fonts/OpenSans-Regular.ttf');
//     const _fontSemiBold = await encodeToDataUrl('./fonts/OpenSans-SemiBold.ttf');
//     const _badgesHTML = await renderBadgesHTML(userData["badges"], appURL);

//     let htmlResult =  `
//     <html>
//         <meta charset="UTF-8">
//         <head>
//             <style>
//             @font-face {
//                 font-family: 'Open Sans';
//                 font-display: swap;
//                 src: url(${_fontRegular}) format('truetype');
//                 font-weight: normal;
//                 font-style: normal;
//             }
//             @font-face {
//                 font-family: 'Open Sans';
//                 font-display: swap;
//                 src: url(${_fontSemiBold}) format('truetype');
//                 font-weight: 600;
//                 font-style: normal;
//             }
//             @font-face {
//                 font-family: 'Open Sans';
//                 font-display: swap;
//                 src: url(${_fontBold}) format('truetype');
//                 font-weight: 700;
//                 font-style: normal;
//             }
//             body {
//                 color: #${mainColor};
//                 font-family: 'Open Sans';
//             }
//             .card {
//                 border: 1px solid #${mainColor};
//                 padding:20px;
//             }
//             .avatar {
//                 border-radius: 50%;
//                 margin-right: 20px;
//             }
//             .name {
//                 margin: 0 0 5px 0;
//             }
//             .username,
//             .member-since {
//                 margin: 0;
//             }
//             .row {
//                 padding-left: 0;
//                 display: grid;
//                 grid-template-columns: repeat(2, 1fr);
//                 margin: 10px 0 0;
//             }
//             .row .badge {
//                 display: flex;
//                 align-items:center;
//                 font-size: 12px;
//                 margin: 0 5px 4px;
//             }
//             .row .badge img {
//                 width: 25px;
//                 height: 25px;
//                 margin-right: 5px;
//             }
//             </style>
//         </head>
//         <body>
//             <table class="card">
//                 <tr>
//                     <td>
//                         <img class="avatar" src="{{avatar}}" />
//                     </td>
//                     <td>
//                         <h1 class="name">{{name}}</h1>
//                         <p class="username"><b>WordPress User:</b> @{{userName}}</p>
//                         <p class="member-since"><b>Member Since:</b> {{memberSince}}</p>
//                     </td>
//                 </tr>
//                 <tr>
//                     <td colspan="2" id="badges">
//                         <ul class="row">
//                         ${_badgesHTML}
//                         </ul>
//                     </td>
//                 </tr>
//             </table>
//         </body>
//     </html>`;


//     if (fs.existsSync(_fileName)) {
//         fs.unlinkSync(_fileName);
//     }

//     nodeHtmlToImage({
//         output: _fileName,
//         selector: '.card',
//         html: htmlResult,
//         content: { userName: userData["userName"], name: userData["name"], avatar: userData["avatar"], memberSince: userData["memberSince"] }
//       })
//      .then(() => console.log('The image was created successfully!'))

//         // if (fs.existsSync('result.html')) {
//         //     fs.unlinkSync('result.html');
//         // }

//         // fs.writeFile('result.html', htmlResult, function (err) {
//         //     if (err) throw err;
//         //     console.log('Saved!');
//         //   });
// }

module.exports = { renderBadgesHTML };