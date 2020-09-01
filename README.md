# YAUS
(Yet Another) Yet Another URL Shortener

## What is this?
This is a URL shortener, it doesn't have anything special.

## Why did you make one, tho?
Why not?

## Seriously, why did you make one?
Cause I needed a project to try Node.js, Vue.js and MongoDB since I've never used them.

## Installation
Download the latest release and unzip it.

## Usage
First of all, you have to set some environment variables:
 - `PORT`, the port you want to run the web service on (default: 3000)
 - `NODE_ENV`, set it to "dev" if in dev environment
 - `MONGO_URL`, the url to the MongoDB instance [required]

And then just run `npm run start`.

For example,
```
$ export MONGO_URL=172.16.1.10:27017/yaus
$ npm run start

> yaus@0.1.0 start /home/enrico/yaus
> node app.js

YAUS running at http://localhost:3000
```

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)