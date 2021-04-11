import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ExecutorAccount from "./components/ExecutorAccount/ExecutorAccount";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";
import OrderForm from "./components/OrderForm/OrderForm";
import Register from "./components/Register/Register";
import Services from "./components/Services/Services";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signupAC } from "./redux/actionCreators/userAC";
import UserAccount from "./components/UserAccount/UserAccount";
import Verification from "./components/Verification/Verification";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/user/checkAuth", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((resFromServer) => dispatch(signupAC(resFromServer)));
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          {/* <Route path="/account">
            <Account />
            <CenteredGrid />
          </Route> */}

          <Route path="/account">
            <UserAccount />
          </Route>

          <Route path="/services">
            <Services />
          </Route>

          <Route path="/order">
            <OrderForm />
          </Route>

          <Route path="/verification">
            <Verification />
          </Route>
          <Route path="/exaccount">
            <ExecutorAccount />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
//Attention!
