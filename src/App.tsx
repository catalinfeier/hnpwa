import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router";
import { Header } from "./components/Header";
import NewsStore from "./stores/NewsStore";
import { TopStories } from "./components/TopStories";
import { Provider, inject } from "mobx-react";
import { NewestStories } from "./components/NewestStories";
import {Item} from './components/Item'
class App extends React.Component<any, any> {
  newsStore = new NewsStore();

  render() {
    return (
      <div className="App">
        <Header />
        <Provider store={this.newsStore}>
          <Switch>
            <Route path="/news/:page" component={TopStories}></Route>
            <Route path="/newest/:page" component={NewestStories}></Route>
            <Route path="/show/" component={() => <div>show</div>}></Route>
            <Route path="/ask/" component={() => <div>ask</div>}></Route>
            <Route path="/jobs/" component={() => <div>jobs</div>}></Route>
            <Route path="/item/:id" component={Item}></Route>
            <Route path="/" component={() => <Redirect to="/news/1"/>}></Route>

          </Switch>
        </Provider>
      </div>
    );
  }
}

export default App;
