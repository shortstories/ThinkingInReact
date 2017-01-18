import Express from "express";
import React from "react";
import Path from "path";
import routes from "./routes";
import {match, RouterContext} from "react-router";
import {renderToString} from "react-dom/server";

import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = Express();
const compiler = webpack(webpackConfig);

app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, 'views'));

app.use(webpackDevMiddleware(compiler, {publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.use(Express.static(Path.join(__dirname, "static")));

app.get("*", (req, res) => {
  match(
    {routes, location: req.url},
    (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      let markup;
      if (renderProps) {
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        console.error("Not Found [" + req.url + "]");
        return res.status(404).send("Not Found");
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  console.info(`Server starting on port ${port} [env: ${env}]`);
});