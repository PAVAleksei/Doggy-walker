import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ExecutorAccount from "./components/ExecutorAccount/ExecutorAccount";
import Header from "./components/Header/Header";
// import Login from './components/Login/Login';
import MainPage from "./components/MainPage/MainPage";
import OrderForm from "./components/OrderForm/OrderForm";
// import Register from './components/Register/Register';
import Services from "./components/Services/Services";
import AddDog from "./components/DogInfo/AddDog";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAC } from "./redux/actionCreators/userAC";
import UserAccount from "./components/UserAccount/UserAccount";
import EditDog from "./components/DogInfo/Edit";
import Verification from "./components/Verification/Verification";
import EditUser from "./components/UserAccount/EditUser";
import ExecutorSelect from "./components/ExecutorSelect/ExecutorSelect";
import CustomerSelect from "./components/CustomerSellect/CustomerSelect";
import CustomerLogin from "./components/CustomerLogin/CustomerLogin";
import ExecutorLogin from "./components/ExecutorLogin/ExecutorLogin";
import { setOrders, setOrdersCustomer } from "./redux/actionCreators/orderAc";
import Dog from "./components/DogInfo/Dog";
import DetailOrder from "./components/DeatailOreder/DetailOrder";
import HistoryOrders from "./components/HistoryOrders/HistoryOrders";
import DoneOrdersList from "./components/DoneOrdersList/DoneOrdersList";
import { Container } from "@material-ui/core";
import { Footer } from "./components/Footer/Footer";
import { getDogsAC } from "./redux/actionCreators/dogAC";

function App() {
	const dispatch = useDispatch();
	const kindUser = useSelector((state) => state.user.kind);

	useEffect(() => {
		fetch("http://127.0.0.1:3001/user/checkAuth", {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((resFromServer) => dispatch(signupAC(resFromServer)));
	}, []);

	useEffect(() => {
		dispatch(setOrders()); // все заказы в системе
		// dispatch(setOrdersCustomer()); // заказы заказчика
	}, []);

	useEffect(() => {
		fetch("http://127.0.0.1:3001/api/v1/dog")
		// fetch(`${window.location.origin}/api/v1/dog`)
			.then((response) => response.json())
			.then((responseFromServer) => dispatch(getDogsAC(responseFromServer)));
	}, []);

	return (
		<div className="App" >
			<Router>
				<Header />

				<Switch>
					<Route exact path="/order/:id">
						<DetailOrder />
					</Route>
					<Route exact path="/historyOrders">
						<HistoryOrders />
					</Route>
					<Route exact path="/doneOrders">
						<DoneOrdersList />
					</Route>
					<Route exact path="/">
						<MainPage />
					</Route>
					<Route path="/executor">
						<ExecutorSelect />
					</Route>
					<Route path="/customer">
						<CustomerSelect />
					</Route>
          cutomerLogin
          <Route path="/customerLogin">
						<CustomerLogin />
					</Route>
					<Route path="/executorLogin">
						<ExecutorLogin />
					</Route>
					{/* <Route path="/account">
            <Account />
            <CenteredGrid />
          </Route> */}
					<Route path="/account">
						{kindUser === "Исполнитель" ? <ExecutorAccount /> : <UserAccount />}
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
					<Route path="/addDog">
						<AddDog />
					</Route>
					<Route path="/edit/:id">
						<EditDog />
					</Route>
					<Route path="/dog/:id">
						<Dog />
					</Route>
					<Route path="/user/:id">
						<EditUser />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
//Attention!
