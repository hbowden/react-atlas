const path = require("path");
const MiniHtmlWebpackPlugin = require("mini-html-webpack-plugin");
const { generateCSSReferences, generateJSReferences } = MiniHtmlWebpackPlugin;

// Process JS with Babel.
const babel = {
  "test": /\.(js|jsx)$/,
  "exclude": /node_modules/,
  "loader": "babel-loader",
  "query": {
    "presets": ["react", "env"],
    "plugins": ["transform-class-properties", "transform-object-rest-spread"]
  }
};

// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
const css = {
  "test": /\.css$/,
  "loaders": [
    "style-loader?sourceMap",
    "css-loader?modules&importLoaders=1&localIdentName=ra_[name]__[local]",
    {
      "loader": "postcss-loader",
      "options": {
        "config": {
          "path": path.join(__dirname, "postcss.config.js")
        }
      }
    }
  ]
};

// JSON is not enabled by default in Webpack but both Node and Browserify allow it implicitly so we also enable it.
const json = {
  "test": /\.json$/,
  "loader": "json-loader"
};

// Default loader: load all assets that are not handled by other loaders with the url loader.
// Note: This list needs to be updated with every change of extensions the other loaders match.
// E.g., when adding a loader for a new supported file extension, we need to add the supported extension to this loader too.
// Add one new line in `exclude` for each loader.
//
// "file" loader makes sure those assets get served by WebpackDevServer.
// When you `import` an asset, you get its (virtual) filename.
// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
const url = {
  "exclude": [/\.html$/, babel.test, css.test, json.test],
  "loader": "url-loader",
  "query": {
    "limit": 10000,
    "name": "static/media/[name].[hash:8].[ext]"
  }
};

module.exports = {
  // Use this to test a single component.  Change it to the component you are testing and restart the styleguide server
  // Regex should be: 'src/components/NAME_OF_COMPONENT_FOLDER/[A-Z]*.js'
  "components": "../src/**/**.js",
  "require": [path.resolve(__dirname, "../scripts/setup.js")],
  "ignore": [
    "**/__tests__/**",
    "**/utils/**",
    "**/*.test.js",
    "**/*.test.jsx",
    "**/*.spec.js",
    "**/*.spec.jsx",
    "**/index.js"
  ],
  "showUsage": true,
  "defaultExample": true,
  "skipComponentsWithoutExample": true,
  "webpackConfig": {
    "devtool": "source-map",
    "module": {
      "loaders": [babel, css, json, url]
    }
  },
  "template": ({ styles, js, title, publicPath }) =>
    `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <title>${title}</title>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
                ${generateCSSReferences(styles, publicPath)}
              </head>
              <body>
                <div id="app"></div>
                ${generateJSReferences(js, publicPath)}
              </body>
            </html>`,
  "theme": {
    "color": {
      "link": "#006e95",
      "linkHover": "#003058",
      "light": "#006e95",
      "name": "#558000",
      "type": "#b03478"
    }
  }
};
