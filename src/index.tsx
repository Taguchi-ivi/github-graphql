import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './routes/App';
import Home from './routes/Home';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
// import gql from 'graphql-tag';
import { HelmetProvider } from "react-helmet-async";


const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: { authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}` },
    cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <Home />
        </HelmetProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
