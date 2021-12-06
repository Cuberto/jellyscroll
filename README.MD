## Cuberto JellyScroll

### Frontend dependencies
Smooth Scrollbar (https://github.com/idiotWu/smooth-scrollbar)

GSAP v3 (https://greensock.com/gsap/)

Intersection Observer Polyfill, if you want support IE11 (https://www.npmjs.com/package/intersection-observer)

### Usage
```javascript
import JellyEffect from 'jelly';

// Basic usage
const jelly = new JellyEffect();

// Options with defaults
const jelly = new JellyEffect({
    intensity: 0.15, // delta multiplier, set negative to invert
    speed: 0.6, // duration of animation
    min: -5, // minimum deformation value
    max: 5, // maximum deformation value
    scrollPos: () => window.pageYOffset // function that return current scroll position
});

// Programmatically init for each element
import {Jelly} from 'jelly';

const jelly = new Jelly(element, options);
```

### Setup demo project

`npm install` or `yarn install`

### Start demo project

`gulp` or `gulp serve` deploy app and start browsersync server + watchers

## File structure
```bash
├── /tmp/                       # Temporary served files
└── /src/                       # The source code of the application
    ├── /js/                    # JavaScript source
    ├── /pug/                   # Pug templates
        └── /_includes/         # Pug partials
    ├── /scss/                  # SCSS styles
    ├── /static/                # Static files (fonts, images, videos, etc..)
