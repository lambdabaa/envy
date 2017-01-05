envy
====


[![Build
Status](https://travis-ci.org/lambdabaa/envy.png?branch=master)](https://travis-ci.org/gaye/envy)

Inspired by
[lightsofapollo/exhibition](https://github.com/lightsofapollo/exhibition).

### Installation

```bash
git clone https://github.com/gaye/envy.git
// set PATH=/path/to/envy:$PATH
```

#### Slightly Fancier (if you already have some npm)

```bash
npm install -g jsenvy@latest
```

### Usage

```bash
# envy will download default versions of node and npm into a sandbox.
$ envy node --version
v2.2.1

$ envy npm --version
2.11.2

# Or you can configure the versions with environment variables.
$ NODEJS_VERSION=v1.8.1 envy node --version
v1.8.1

$ NPM_VERSION=1.4.28 envy npm --version
1.4.28

# npm -g will install stuff into the sandbox. No sudo required!
$ envy npm install -g mocha
/home/gareth/Documents/envy/npm/2.11.2/bin/bin/mocha -> /home/gareth/Documents/envy/npm/2.11.2/bin/lib/node_modules/mocha/bin/mocha
/home/gareth/Documents/envy/npm/2.11.2/bin/bin/_mocha -> /home/gareth/Documents/envy/npm/2.11.2/bin/lib/node_modules/mocha/bin/_mocha
mocha@2.2.5 /home/gareth/Documents/envy/npm/2.11.2/bin/lib/node_modules/mocha
├── escape-string-regexp@1.0.2
├── supports-color@1.2.1
├── growl@1.8.1
├── commander@2.3.0
├── diff@1.4.0
├── jade@0.26.3 (commander@0.6.1, mkdirp@0.3.0)
├── debug@2.0.0 (ms@0.6.2)
├── mkdirp@0.5.0 (minimist@0.0.8)
└── glob@3.2.3 (inherits@2.0.1, graceful-fs@2.0.3, minimatch@0.2.14)

# Magic!
$ envy mocha --help
```

### Profile

You can also specify project-specific `NODEJS_VERSION` and `NPM_VERSION`
by adding an `.envyrc` file to your project root like this

```bash
NODEJS_VERSION=v0.12.4
NPM_VERSION=2.11.2
```
