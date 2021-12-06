/*!
 * Cuberto JellyScroll
 * https://cuberto.com/
 *
 * @version 1.0.1
 * @author Artem Dordzhiev (Draft) | Cuberto, info@cuberto.com
 * @license Copyright 2020, Cuberto. All rights reserved.
 */

import gsap from "gsap";

export default class JellyEffect {
    constructor(options) {
        this.jellys = [];
        this.els = document.querySelectorAll('[data-cuberto-jelly]');
        for (let i = 0; i < this.els.length; i++) {
            const el = this.els[i];
            const opts = Object.assign({}, options, el.dataset.cubertoJelly ? JSON.parse(el.dataset.cubertoJelly) : {});
            const jelly = new Jelly(el, opts);
            this.jellys.push(jelly);
        }
    }

    pause(state) {
        for (let i = 0; i < this.jellys.length; i++) this.jellys[i].pause(state);
    }

    destroy() {
        for (let i = 0; i < this.jellys.length; i++) this.jellys[i].destroy();
    }
}

export class Jelly {
    constructor(el, options) {
        this.el = el;
        this.paused = false;
        this.options = Object.assign({}, {
            intensity: 0.15,
            speed: 0.6,
            min: -5,
            max: 5,
            scrollPos: () => window.pageYOffset
        }, options);
        this.init();
    }

    getScrollPos() {
        return this.options.scrollPos();
    }

    pause(state = true) {
        this.paused = state;
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.startLoop()
            } else {
                this.stopLoop();
            }
        });
        this.observer.observe(this.el);
    }

    startLoop() {
        this.y = this.getScrollPos();
        this.loop();
    }

    stopLoop() {
        cancelAnimationFrame(this.frame);

        if (!this.paused) {
            gsap.set(this.el, {skewY: 0});
        }
    }

    loop() {
        const y = this.getScrollPos();
        const diff = y - this.y;
        const skew = Math.min(Math.max(this.options.min, diff * this.options.intensity), this.options.max);

        if (!this.paused) {
            gsap.set(this.el, {skewY: skew, force3D: true});
            this.animationPaused = false;
        } else {
            if (!this.animationPaused) {
                gsap.to(this.el, {skewY: 0, force3D: true, duration: this.options.speed});
                this.animationPaused = true;
            }
        }

        this.y = y;
        this.frame = requestAnimationFrame(this.loop.bind(this));
    }

    destroy() {
        this.observer.disconnect();
        this.pause(false);
        this.stopLoop();
    }
}
