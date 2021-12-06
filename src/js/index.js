import JellyEffect from 'jelly';
import SmoothScrollbar from 'smooth-scrollbar';
import SoftScrollPlugin from 'vendor/smooth-scrollbar/SoftScrollPlugin';
import "intersection-observer"; // if you want support IE11

// Soft edges plugin for SmoothScroll
SmoothScrollbar.use(SoftScrollPlugin);

// Init smooth scrollbar
const view = document.getElementById('view-main');
const scrollbar = SmoothScrollbar.init(view, {
    renderByPixels: false,
    damping: 0.075
});

// Init Jelly and provide smooth scrollbar offset
const jelly = new JellyEffect({
    scrollPos: () => scrollbar.offset.y
});

// Optional demo: pause when scroll via scrollbar track
scrollbar.track.yAxis.element.addEventListener('mousedown', () => {
    jelly.pause(true);
});

document.documentElement.addEventListener('mouseup', () => {
    jelly.pause(false);
}, true);