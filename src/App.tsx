import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import { inject, observer } from "mobx-react";
import { Header } from "./components/Header";
import NewsStore, { NewsItem } from "./stores/NewsStore";
import { TopStories } from "./components/TopStories";
import { Provider } from "mobx-react";
import { NewestStories } from "./components/NewestStories";

class App extends React.Component<any, any> {
  newsStore = new NewsStore();

  render() {
    return (
      <div className="App">
        <Header />

        <Switch>
          <Route
            path="/news/"
            component={() => <TopStories store={this.newsStore} />}
          ></Route>
          <Route
            path="/newest/"
            component={() => <NewestStories store={this.newsStore} />}
          ></Route>
          <Route path="/show/" component={() => <div>show</div>}></Route>
          <Route path="/ask/" component={() => <div>ask</div>}></Route>
          <Route path="/jobs/" component={() => <div>jobs</div>}></Route>
          <Route path="/" component={() => <div>Home Page</div>}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
