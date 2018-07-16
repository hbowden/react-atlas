const path = require("path");
const webpack = require("webpack"); // eslint-disable-line
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
  "entry": {
    "Accordion": "./src/Accordion",
    "AccordionPanel": "./src/AccordionPanel",
    "Alert": "./src/Alert",
    "Avatar": "./src/Avatar",
    "Button": "./src/Button",
    "Card": "./src/Card",
    "Checkbox": "./src/Checkbox",
    "CheckboxGroup": "./src/CheckboxGroup",
    "DatePicker": "./src/DatePicker",
    "Dialog": "./src/Dialog",
    "Dropdown": "./src/Dropdown",
    "FileUpload": "./src/FileUpload",
    "Hint": "./src/Hint",
    "Icon": "./src/Icon",
    "List": "./src/List",
    "ListGroup": "./src/ListGroup",
    "ListItem": "./src/ListItem",
    "Modal": "./src/Modal",
    "Overlay": "./src/Overlay",
    "Portal": "./src/Portal",
    "ProgressBar": "./src/ProgressBar",
    "Radio": "./src/Radio",
    "RadioGroup": "./src/RadioGroup",
    "Switch": "./src/Switch",
    "Tab": "./src/Tab",
    "Table": "./src/Table",
    "TableHeader": "./src/TableHeader",
    "TabList": "./src/TabList",
    "TabPanel": "./src/TabPanel",
    "Tabs": "./src/Tabs",
    "Task": "./src/Task",
    "Taskbar": "./src/Taskbar",
    "Text": "./src/Text",
    "TextArea": "./src/TextArea",
    "TextField": "./src/TextField",
    "Timer": "./src/Timer",
    "Tooltip": "./src/Tooltip"
  },
  "devtool": "source-map",
  "output": {
    "path": path.join(__dirname, "../lib"),
    "filename": "[name]/[name].js",
    "libraryTarget": "umd"
  },
  "optimization": {
    "splitChunks": {
      "cacheGroups": {
        "styles": {
          "name": "styles",
          "test": /\.css$/,
          "chunks": "all",
          "enforce": true
        }
      }
    }
  },
  "externals": [
    {
      "react": {
        "root": "React",
        "commonjs2": "react",
        "commonjs": "react",
        "amd": "react"
      }
    },
    {
      "react-dom": {
        "root": "ReactDOM",
        "commonjs2": "react-dom",
        "commonjs": "react-dom",
        "amd": "react-dom"
      }
    }
  ],
  "module": {
    "rules": [
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader"
        }
      },
      {
        "test": /\.css$/,
        "use": [
          MiniCssExtractPlugin.loader,
          {
            "loader": "css-loader",
            "query": {
              "modules": true,
              "importLoaders": 1,
              "localIdentName": "ra_[name]__[local]",
              "minimize": true
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  "plugins": [
    new MiniCssExtractPlugin({
      "chunkFilename": "atlasThemes.min.css"
    })
  ]
};

module.exports = config;
