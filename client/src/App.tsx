import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContinentList from "./screens/ContinentList";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import CountryList from "./screens/CountryList";
import CountryDetails from "./screens/CountryDetails";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<ContinentList />} path="/" />
          <Route element={<CountryList />} path="/continents/:code" />
          <Route element={<CountryDetails />} path="/countries/:code" />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
