import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ExecutorAccount from './components/ExecutorAccount/ExecutorAccount';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import MainPage from './components/MainPage/MainPage';
import Order from './components/Order/Order';
import Register from './components/Register/Register';
import Services from './components/Services/Services';
import UserAccount from './components/UserAccount/UserAccount';

function App() {
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

					<Route path="/account">
						<UserAccount />
					</Route>

					<Route path="/exaccount">
						<ExecutorAccount />
					</Route>

					<Route path="/services">
						<Services />
					</Route>

					<Route path="/order">
						<Order />
					</Route>

				</Switch>
			</Router>
		</div>
	);
}

export default App;
//Attention!
