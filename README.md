# react-product-pages
POC to replace current .NET brandsite platform - react + micro services

Utilizing Minimongo in the browser, we fetch an initial set of data from our service and query minimongo for each view.
The only additional queries to the service consist of mising data from parts lists or search results.

# Quick start
The only development dependencies of this project are:
* [Node.js > 4.0](https://nodejs.org) (try [NVM](https://github.com/creationix/nvm) to manage node versions),
* [Webpack](https://github.com/webpack/webpack)
* [gulp](https://github.com/gulpjs/gulp)

```
npm install -g webpack gulp
```

Then type few commands known to every Node developer...
```
git clone https://github.com/suprsidr/react-product-pages.git
cd react-product-pages
npm install
npm run start
```

then visit localhost:3000
