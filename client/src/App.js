import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MessageContext from "./context/messages/MessageContext";
import Message from "./components/MessageBox/Message";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import AuthContext from "./context/Auth/AuthContext";
import { Redirect } from "react-router";
import CheckOutPage from "./pages/CheckOutPage";
import CatProduct from "./pages/CatProduct";
function App() {
  const MessageCtx = useContext(MessageContext);
  const Auth = useContext(AuthContext);
  return (
    <Router>
      {MessageCtx.isMessage && (
        <Message Message={MessageCtx.Message} isError={MessageCtx.isError} />
      )}
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/Auth/:type">
            <AuthPage />
          </Route>
          <Route path="/Product/:ProductId">
            <ProductPage />
          </Route>
          {Auth.isUser && (
            <Route path="/:UserId/Cart">
              <CartPage />
            </Route>
          )}
          {Auth.isUser && (
            <Route path="/:UserId/Order">
              <OrderPage />
            </Route>
          )}
          <Route path="/Search">
            <SearchPage />
          </Route>
          <Route path="/:UserId/Checkout">
            <CheckOutPage />
          </Route>
          <Route path="/Cat/:cat">
            <CatProduct />
          </Route>
          <Route path="*">
            {!Auth.isUser && <Redirect to="/Auth/SignIn" />}
            {Auth.isUser && <Redirect to="/" />}
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
