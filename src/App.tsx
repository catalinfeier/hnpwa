import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router";
import { Header } from "./components/Header";
import NewsStore from "./stores/NewsStore";
import { Stories } from "./components/Stories";
import { Provider } from "mobx-react";
import { ItemWithComments } from "./components/ItemWithComments";
import { UserDetails } from "./components/UserDetails";
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
            <Provider>
              <Switch>
                <Route
                  path="/news/:page"
                  render={props => (
                    <Stories {...props} type="news" key="newsStories" />
                  )}
                ></Route>
                <Route
                  path="/newest/:page"
                  render={props => (
                    <Stories {...props} type="newest" key="newestStories" />
                  )}
                ></Route>
                <Route
                  path="/show/:page"
                  render={props => (
                    <Stories {...props} type="show" key="showStories" />
                  )}
                ></Route>
                <Route
                  path="/ask/:page"
                  render={props => (
                    <Stories {...props} type="ask" key="askStories" />
                  )}
                ></Route>
                <Route
                  path="/jobs/:page"
                  render={props => (
                    <Stories {...props} type="jobs" key="jobsStories" />
                  )}
                ></Route>
                <Route path="/item/:id" component={ItemWithComments}></Route>
                <Route path="/user/:id" component={UserDetails}></Route>
                <Route
                  path="/"
                  component={() => <Redirect to="/news/1" />}
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
