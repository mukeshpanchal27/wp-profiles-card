# Welcome to CardPress

Have you considered sharing your public <a href="https://wordpress.org/" target="_blank">WordPress.org</a> profile? You can now present it in a card format that showcases your achievements. This card displays your avatar, name, badges, and more.

<a href="https://cardpress.us/" target="_blank">CardPress</a> was developed for the community to highlight your accomplishments. It creates an image that can be easily shared using a URL or Markdown. Additionally, it fully supports <a href="https://docs.github.com/en/get-started/start-your-journey/setting-up-your-profile#adding-a-profile-readme" target="_blank">GitHub profile pages.</a>

## Features
-   [Accessing Card](#accessing-card)
    -   [Parameters](#parameters)
- [JSON Data](#json-data)
- [Collaborate](#collaborate---report-issues--suggestions-)
- [Changelog](#stay-updated-with-our-changelog-)
- [Recognition](#wordpress-team-recognition-)
- [Support this Project](#support-this-project-️)

### Accessing Card
To access your card, reach the link below and replace the username with your WordPress profile name.

```md
https://www.cardpress.us/card?username=[YOUR_USERNAME_HERE]
```

If you want to use your card in a markdown file, just copy & paste the code below, by putting your WordPress username into the username variable.

```md
[![Rodrigo's WordPress Activity](https://www.cardpress.us/card?username=rodrigodonini&badges=true)](https://www.cardpress.us/)
```

![CardPress Example](https://www.cardpress.us/static/images/CardExample.jpg "CardPress Example")


#### Parameters
- **badges** [true|false] default true: Show / Hide profile badges
- **header** [true|false] default true: Show / Hide header section (avatar, name, username, member since)
- **refresh** [true|false] default false: Refresh profile card content
- **headerColor** [HEX COLOR] default value _191E23_
- **nameColor** [HEX COLOR] default value _191E23_
- **subHeaderColor** [HEX COLOR] default value _82878C_
- **badgeLabelColor** [HEX COLOR] default value _23282D_
- **foreground** [HEX COLOR] default value _FFFFFF_
- **linkProfile** [true|false] default false: Add WordPress profile link to the card

## JSON Data

Want to display WordPress profiles differently? No problem—just fetch the data using the JSON results.

Want to customize how WordPress profiles are displayed? No worries! You can access the profile information using the JSON data output. This means you’re free to use the data in your own layout, design, or even integrate it into another system—whatever works best for your needs. Usage below:

```md
https://www.cardpress.us/json?username=[YOUR_USERNAME_HERE]
```

### JSON Data Format
```md
{
  "userName": "rodrigodonini",
  "name": "Rodrigo Donini",
  "avatar": "https://secure.gravatar.com/avatar/c8cf504e5ae3826eb87591aa4f6658e912bc658a0d8aa487ad90b4ce26ff7f24?s=100&d=mm&r=g",
  "memberSince": "December 18th, 2013",
  "badges": [
    {
      "class": "badge item dashicons badge-community-contributor dashicons-groups",
      "name": "Community Contributor"
    },
    {
      "class": "badge item dashicons badge-organizer dashicons-nametag",
      "name": "Meetup Organizer"
    },
    {
      "class": "badge item dashicons badge-plugins dashicons-admin-plugins",
      "name": "Plugin Developer"
    },
    {
      "class": "badge item dashicons badge-translation-contributor dashicons-translation",
      "name": "Translation Contributor"
    },
    {
      "class": "badge item dashicons badge-organizer dashicons-tickets",
      "name": "WordCamp Organizer"
    },
    {
      "class": "badge item dashicons badge-speaker dashicons-megaphone",
      "name": "WordCamp Speaker"
    },
    {
      "class": "badge item dashicons badge-wordpress-tv-contributor dashicons-video-alt2",
      "name": "WordPress.tv Contributor"
    }
  ]
}
```

## Collaborate - Report Issues & Suggestions 💪

This is our project — built for the community — and there’s always room for improvement. The source code is available on <a href="https://github.com/donini/wp-profiles-card" target="_blank">GitHub</a>, so feel free to check it out. If you come across any bugs or have suggestions to enhance the tool, you can report them <a href="https://github.com/donini/wp-profiles-card/issues/new" target="_blank">here</a>. Just make sure to check if the issue hasn’t already been <a href="https://github.com/donini/wp-profiles-card/issues" target="_blank">reported</a>.

## Stay Updated with Our Changelog 📢

Stay up to date with the latest features, fixes, and improvements in CardPress.
Check out the full changelog <a href="https://cardpress.us/changelog">here</a> to see what’s new!

## WordPress Team Recognition 🩵

It is beautful to see so many users sharing their profiles through it. Thanks so much for the mention — CardPress was created for the community, and we truly appreciate the support! 🫶

<blockquote class="twitter-tweet" data-cards="hidden" data-dnt="true" align="center"><p lang="en" dir="ltr">Show off your <a href="https://t.co/B0aO4F9PVs">https://t.co/B0aO4F9PVs</a> achievements with CardPress. Created by WordPress contributor <a href="https://twitter.com/donini?ref_src=twsrc%5Etfw">@donini</a>, this simple tool creates shareable cards highlighting your badges, contributions, and profile, perfect for GitHub, portfolios, or blogs. Generate your card today at…</p>&mdash; WordPress (@WordPress) <a href="https://twitter.com/WordPress/status/1928557192619204767?ref_src=twsrc%5Etfw">May 30, 2025</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Support this Project ☕️
Together, we can keep this service running for the community, and all donations raised will go towards keeping this service running, such as hosting costs. ☕️
<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="cardpress" data-color="#252525" data-emoji=""  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#ffffff" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>