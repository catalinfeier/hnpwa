import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router";
import { Header } from "./components/Header";
import NewsStore from "./stores/NewsStore";
import { TopStories } from "./components/TopStories";
import { Provider } from "mobx-react";
import { NewestStories } from "./components/NewestStories";
import { ItemWithComments } from "./components/ItemWithComments";
import { UserDetails } from "./components/UserDetails";
import { ShowStories } from "./components/ShowStories";
import { AskStories } from "./components/AskStories";
import { JobsStories } from "./components/JobsStories";
import { createBrowserHistory } from "history";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { Router } from "react-router";

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

class App extends React.Component<any, any> {
  newsStore = new NewsStore();
  routingStore = new RouterStore();

  render() {
    return (
      <Provider routingStore={routingStore} store={this.newsStore}>
        <Router history={history}>
          <div className="App">
            <Header />
            <Provider >
              <Switch>
                <Route path="/news/:page" component={TopStories}></Route>
                <Route path="/newest/:page" component={NewestStories}></Route>
                <Route path="/show/:page" component={ShowStories}></Route>
                <Route path="/ask/:page" component={AskStories}></Route>
                <Route path="/jobs/:page" component={JobsStories}></Route>
                <Route path="/item/:id" component={ItemWithComments}></Route>
                <Route path="/user/:id" component={UserDetails}></Route>
                <Route
                  path="/"
                  component={() => <Redirect to="/news/" />}
                ></Route>
              </Switch>
            </Provider>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
