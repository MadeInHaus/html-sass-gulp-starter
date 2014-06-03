# Minimal Boilerplate for HTML / CSS / JS

This boilerplate is adapted from patterns found in [HTML5 Boilerplate](http://html5boilerplate.com). It bundles in common build functionality using Fabric and RequireJS.

- Requires: [sass](http://sass-lang.com), [fabric](http://docs.fabfile.org/en/1.5/), git, [compass](http://compass-style.org/), [grunt](http://gruntjs.com/) (as a task runner)
- Comes ready with: [RequireJS](http://requirejs.org)
- Also packaged and available for use with Require.js:, [jQuery](http://jquery.com), [Lo-Dash](http://lodash.com/), [Backbone](http://backbonejs.org)


## How to start:
1. Edit your `index.html` file of course
1. Run `npm install` to grab all the necessary dev dependencies listed in `package.json`
1. Use Grunt for all development worflow tasks. [Jump to the "workflow" section](#dev-workflow).
1. By default, your javascript entry point begins at `/static/js/main.js`
1. JS configuration settings are at `/static/js/config.js`
1. Your JS build description file is at `/static/js/app.build.js`. Grunt is referencing the configuration options in `Gruntfile.js`
1. Compass configuration is at `/static/css/config.rb`, base url can be set there or with an environment variable

## How to deploy:
- deploy to staging: ```fab deploy.staging``` _(requires setup)_
- deploy to production: ```fab deploy.production``` _(requires setup)_

## Editor Configuration
To unify coding styles (spacing, line-endings, etc) between different editors and IDEs, HAUS uses [EditorConfig](http://editorconfig.org/)

1. If you haven't already - [install a plugin for your editor](http://editorconfig.org/#download)
1. Thats it! The plugin will look for a .editorconfig file in your project directory and automatically format the file correctly on save.

# CSS w/ SASS + COMPASS

This boilerplate assumes "mobile-first" philosophy as a default. If this goes against your project's approach, simply remove the media query definitions in `styles.scss` and related files in the `mq` directory.  

1. All new sass files reside in `/static/css/src/` and assume SCSS syntax
1. As a general rule of thumb and best practice, the @extend method should be used whenever possible over @mixin. `_.extends.scss` can be leveraged for some useful methods to extend into your app's style definitions. Feel free to add your own or modify as you fit. 

## Install SASS & Compass ##
    sudo gem install sass compass


## Dev Workflow

### Option 1 ###
Use [Grunt](http://gruntjs.com) as a task runner for CSS, JS and running a local server (http://0.0.0.0:8000 is the default).

#### Grunt Commands ####
1. `$ grunt`: Compiles css and lints all javascript (within `js/app`)
1. `$ grunt dev`: Runs a local server and watches for css/js changes
1. `$ grunt prod`: Builds out production code, minifies and concatenates all css and js


### Option 2 ###
We are normally in a python project, and ar using fabric.  So we wrote up fabric scripts to watch and compress.

    fab css.watch

or compressed:

    fab css.compile


# JavaScript w/ Require.js

1.	**Do not use minified files during development.**
1.	**Always use a build process to minify files for production and staging.**
1.	Do not include version number in filename _(i.e. jquery.js, not jquery-1.8.3.js)_, non-minified builds will likely always have a version # at the top of their file
1.	Any libraries added will need to have an entry in the require.js config file
1.	Adding objects to the global namespace should be kept to an absolute minimum

### Quick example using AMD modules

create file `/static/js/app/supportsCSS3.js`, wrap it in a "define()" function call:

	define(function( require ){
		var M = require('modernizr');
		//the returned function is the modules value
		return function(){
			return M.cssgradients && M.csstransforms && M.csstransitions;
		};
	});

in file `/static/js/app/main.js`, require your new module:

	define(function( require ){
		var $ = require('jquery'),
			supportsCSS3 = require('./supportsCSS3');

		if( supportsCSS3() ){
			//do awesome things
			$('.things').css({
				transition: 'all 1s linear',
				transform: 'rotate(45deg)'
			});
		}
	});


# HAUS JavaScript Styleguide

The HAUS JavaScript Styleguide is based upon Boucoup's [Idiomatic.js](https://github.com/rwldrn/idiomatic.js#table-of-contents).

### All code in any code-base should look like a single person typed it, no matter how many people contributed.

> "Arguments over style are pointless. There should be a style guide, and you should follow it."
> _Rebecca_ _Murphey_

> "Part of being a good steward to a successful project is realizing that writing code for yourself is a Bad Idea™. If thousands of people are using your code, then write your code for maximum clarity, not your personal preference of how to get clever within the spec."
> _Idan_ _Gazit_



## Table of Contents

 * [Whitespace](#1-whitespace)
 * [Beautiful Syntax](#2-beautiful-syntax)



## Preface

The following sections outline a _reasonable_ style guide for modern JavaScript development and are not meant to be prescriptive. The most important take-away is the **law of code style consistency**. Whatever you choose as the style for your project should be considered law.



## 1. Whitespace

- **Never mix spaces and tabs.**
- When beginning a project, before any code is written, the project lead chooses between soft indents (spaces) or real tabs. Consider this **law**.
- If your editor supports it, always work with the "show invisibles" setting turned on. The benefits of this practice are:
	- Enforced consistency
	- Eliminating end of line whitespace
	- Eliminating blank line whitespace
	- Commits and diffs that are easier to read
- Follow English language conventions where appropriate. E.g., punctuation (comma, colon, semicolon etc.) is followed by a space, but not preceeded by one.

Conditionals and Loops:

- Keywords are followed by a space.
- Opening brace is not followed by a space.
- Closing brace is not preceeded by a space.
- Opening curly brace is preceeded by a space.

```javascript
if (condition) {
    // statements
}

for (var i = 0; i < 100; i++) {
    // statements
}
```

Expressions:

```javascript
var num = (a + 10) * 3;
```



## 2. Beautiful Syntax

### A. Parens, Braces, Linebreaks

- Always use curly braces, even if you don't have to (single statement after if/while/for/..).
- Opening curly brace appears on the same line.
- Closing curly brace appears by itself on a new line.

```javascript
if (condition) {
    // statements
}

while (condition) {
    // statements
}

for (var i = 0; i < 100; i++) {
    // statements
}

if (condition) {
    // statements
} else {
    // statements
}

function hello(argument) {
    // statements
}
```

### B. Declarations, Assignments, Functions (Named, Expression, Constructor)

Variable declarations:

Variables should be declared at the very top of their respective scope, although there might be exceptions from this rule. Declare variables where it makes sense, but try not to scatter them around too much. Loop iterators (i, j, ...) might be declared inline, when appropriate. Read up on variable hoisting.

```javascript
var foo = "bar",
    num = 1,
    bool = true;

// OR:

var foo = "bar";
var num = 1;
var bool = true;
```

Object literals:

```javascript
var obj = {};
var arr = [];
```

Named function declarations:

```javascript
function square(num) {
    return num * num;
}

// Usage:
square(10);
```

Callbacks:

```javascript
function square(num, callback) {
    callback(num * num);
}

// Usage:
square(10, function(result) {
    // callback statements
});
```

Function expressions:

```javascript
var square = function(num) {
    return num * num;
};
```

Function expressions with identifier:

This preferred form has the added value of being able to call itself and have an identity in stack traces.

```javascript
var factorial = function factorial(num) {
    if (num < 2) {
        return 1;
    }
    return num * factorial(num - 1);
};
```

Constructor declarations:

```javascript
function FooBar(options) {
    this.options = options || {};
}

// Usage
var fooBar = new FooBar({ a: "alpha" });
```

Function call examples:

```javascript
// Single and multiple arguments:
foo(10);
foo("bar");
foo("bar1", "bar2");

// Array and object literal arguments:
foo([ "bar1", "bar2" ]);
foo({ a: "bar1", b: "bar2" });

// More complex literals:
foo({
    a: "bar1",
    b: "bar2",
    c: "bar3",
    success: function() {
        // ...
    },
    error: function() {
        // ...
    }
});

// Callback:
foo(function(result, options) {
	// callback statements
});
```

### C. Consistency Always Wins

In sections 2.A and 2.B above, the whitespace rules are set forth as a recommendation with a simpler, higher purpose: consistency. It's important to note that formatting preferences, such as "inner whitespace" should be considered optional, but only one style should exist across the entire source of your project.

### E. Quotes

Whether you prefer single or double shouldn't matter, there is no difference in how JavaScript parses them. What ABSOLUTELY MUST be enforced is consistency. Never mix quotes in the same project. Pick one style and stick with it. We recommend using double quotes.

### F. End of Lines and Empty Lines

Whitespace can ruin diffs and make changesets impossible to read. Consider incorporating a pre-commit hook that removes end-of-line whitespace and blanks spaces on empty lines automatically. Most modern editors can be set up to do that on file save.


