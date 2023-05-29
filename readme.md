# Welcome to CardPress
An easy way to public share your WordPress.org profile activity into a web card.

# Features
-   [Accessing Card](#accessing-card)
    -   [Options](#options)

### Accessing Card
There are two ways of output your WordPress Profile Card, the HTML to dynamic output your profile activity (default) and the image format which is under BETA and mostly used to save locally the card.


**HTML Output**

By default the card output is in HTML format.
To access your card reach the link below by update the username by your WordPress profile name.

```md
https://www.cardpress.us/card/?username=rodrigodonini
```

If you want to use your card in a markdown file, just copy & paste the code below, by putting your WordPress username into the :username variable.

```md
[![Rodrigo's WordPress Activity](https://www.cardpress.us/card/?username=rodrigodonini)](https://www.cardpress.us/)
```

**Image Output (BETA)**

Add the parameter &format=image to the end of the URL.

```md
https://www.cardpress.us/card/?username=rodrigodonini&format=image
```

#### Options
- output (default html [image|html])
- color (default HEX 000000)
- foreground (default HEX ffffff)
- display profile picture (default true - [true|false])
- badges (default true [true|false])
- format (default html [html|image])
- border (default true [true|false])
- link to WordPress profile (default false [true|false])


### TODO LIST
1. Convert badge icons into SVG or dashicons