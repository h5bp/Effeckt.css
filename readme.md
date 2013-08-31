Effeckt.css
===========

**Performant Transitions &amp; Animations**

Ever notice how small flourishes and subtle transitions dramatically increases the value of the experience you enjoy with an app or site?

Designing and developing UIs for the mobile web is tricky, but it's extremely difficult to do that while delivering something that performs at 60fps. The best opportunities to getting jank-free transitions on phones/tablets are CSS transition and keyframe animation based, especially tapping into hardware-accelerated transforms and opacity changes.

@daneden did really nice work with [Animate.css](http://daneden.me/animate/) but I think the web would benefit if we could take that work to the next level. There's already been fantastic experiments and demos exploring CSS-based transitions, but it's distributed all over.

Originally started at [h5bp/lazyweb-requests#122](https://github.com/h5bp/lazyweb-requests/issues/122)


### Issues or Feedback?
Head here → [http://github.com/h5bp/Effeckt.css/issues](https://github.com/h5bp/Effeckt.css/issues)

### Work In Progress Demo Page
Head here → [http://h5bp.github.io/Effeckt.css/dist/](http://h5bp.github.io/Effeckt.css/dist/)

### ✭ Contributing & Pull Requests
If you'd like to contribute to the [Effeckt.css](https://github.com/h5bp/Effeckt.css) project (btw you're awesome for doing so) then we suggest you do the following…

1. [Fork this Repo](https://github.com/h5bp/Effeckt.css)
2. Create a new branch on your forked copy of this project.
3. Submit your branch to [this repo](https://github.com/h5bp/Effeckt.css) as a PR.
4. Wait for unicorns to appear.

**:heavy_exclamation_mark: A Note Regarding Pull Requests :**
Please keep your commits targeted and in a logical fashion in order to keep code review and merges as clean as possible. Generally commits shouldn't be a "save" for authors. Multiple commits sent via a PR can also create chaos when doing something like a ``git bisect`` later on. Rebasing commits from a repo where other contributors have acces can cause major conflicts for those tracking the project through a fork.

- How to rebase your commits before submitting a PR: [http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html)

### General CSS style guide:

- Two spaces
- Prefix classes/variables with `effeckt-`
- Data attributes can be `data-effeckt` or prefixed with that


### Tech

- [Sass](http://sass-lang.com/)
- [Node](http://nodejs.org/) and [npm](https://npmjs.org/) so we can...
  1. Use [Grunt](http://gruntjs.com/)
  1. Grunt will process .scss on file saves
  1. Grunt will run [autoprefixer](https://github.com/ai/autoprefixer)
  1. Grunt will [LiveReload](http://livereload.com/) the browser (style injection, you'll need the [browser extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-))
- [jQuery](http://jquery.com/) manipulates the classes used for the effects.

You'll have to:

1. Fork the project and pull down your copy
1. Run `npm install`
1. Make sure you have the Grunt command-line interface with `npm install -g grunt-cli` or alternatively `sudo npm install -g grunt-cli` if you encounter permissions issues
1. Run `grunt dev` to start watching for file saves & run a local web server at port 8000 ([localhost:8000](http://localhost:8000/)).


### Examples To Add

Here's a **few pieces of excellent work**:

<a href="http://youtu.be/Qc40YDFA4Bg">
![image](https://f.cloud.github.com/assets/39191/725426/aa3af38c-e067-11e2-82e4-269086cb845d.png)
</a>

* [tympanus.net/Development/ModalWindowEffects/](http://tympanus.net/Development/ModalWindowEffects/)
* [tympanus.net/Development/PageTransitions/](http://tympanus.net/Development/PageTransitions/)
* [tympanus.net/Development/PFold/index2.html](http://tympanus.net/Development/PFold/index2.html)
* [leaverou.github.io/animatable/](http://leaverou.github.io/animatable/)
* [lab.hakim.se/ladda/](http://lab.hakim.se/ladda/)
* [lab.hakim.se/kontext/](http://lab.hakim.se/kontext/)
* [lab.hakim.se/avgrund/](http://lab.hakim.se/avgrund/)
* [lab.hakim.se/meny/](http://lab.hakim.se/meny/)

Because there are so many, I expect we could **group things by role**:

* button/touch effects
* state transition
* modal/notification transition
* attention attractors


## Goals

This library/framework would come with some **goals**:

1. It provides very little UI. It's only hooks for transitions/animations.
1. Designer-curated set of classy and reasonable effects. (no [`easeInBounce`](http://easings.net/#easeInBounce))
1. Establish browser support guidelines (e.g. Android 2.3 would gracefully degrade)
1. CSS performance regression testing (a la [bench.topcoat.io](http://bench.topcoat.io))
1. Deliver jank-free *60fps* performance on target browsers/devices
1. If a particular effect cannot deliver target performance (hey `blur()` css filter), it cannot be included.
1. Guidelines on what to avoid when styling these affected elements (avoid expensive CSS)
1. Deliver a builder so users can pull only the CSS they need.
1. There is no hover on the mobile web, so any hover-based effects would be excluded or have a tap-based equivalent.


## Action

* If you know other transition/animation based demos/experiments that make sense to include here, file a ticket.
* If you're interested in helping to define the API, let's hear it! File a ticket.
* A web-based builder is a must. A command-line builder isn't important for this.