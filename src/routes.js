import React from "react";
import {Route, IndexRoute} from "react-router";
import Layout from "./components/Layout";
import Index from "./components/Index";
import HelloWorld from "./components/HelloWorld";
import Game from "./components/Game";
import ProductsContainer from "./components/ProductsContainer";

const routes = (
  <Route path="/" component = {Layout}>
    <IndexRoute component = {Index} />
    <Route path="/hello" component = {HelloWorld} />
    <Route path="/game" component = {Game} />
    <Route path="/products" component = {ProductsContainer} />
  </Route>
)

export default routes;