import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";
// Path will be shown in URL. To get URL parameter values: when on the right page, check out this.props.match.params. (In inspector). Update this as I learn more.
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker} />
      <Route path="/store/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;