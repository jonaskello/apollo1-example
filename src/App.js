import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue
} from "react-apollo";
import "./App.css";
import NotFound from "./components/NotFound";
import ContinentList from "./components/ContinentList";
import ContinentDetails from "./components/ContinentDetails";

const networkInterface = createNetworkInterface({
  uri: "https://countries.trevorblades.com/graphql"
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      setTimeout(next, 500);
    }
  }
]);

function dataIdFromObject(result) {
  if (result.__typename) {
    if (result.code !== undefined) {
      return `${result.__typename}:${result.code}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      channel: (_, args) => {
        return toIdValue(
          dataIdFromObject({ __typename: "Channel", id: args["id"] })
        );
      }
    }
  },
  dataIdFromObject
});

const store = createStore(
  combineReducers({
    // todos: todoReducer,
    // users: userReducer,
    apollo: client.reducer()
  }),
  {}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    applyMiddleware(logger),
    // If you are using the devToolsExtension, you can add it here also
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} store={store}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">
              React + GraphQL Tutorial
            </Link>
            <Switch>
              <Route exact path="/" component={ContinentList} />
              <Route
                path="/continent/:continent"
                component={ContinentDetails}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
