import React, { useReducer, useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import appReducer from "./reducers/appReducer";
import { getProducts } from "./actions/firebaseActions";

import AddProduct from "./components/AddProduct";
import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";

const history = createBrowserHistory();

const initialState = { products: [], cart: [] };

const StateContext = React.createContext({});

const App = () => {
	const [isRender, setIsRender] = useState(0);
	const [state, dispatch] = useReducer(appReducer, initialState);

	useEffect(() => {
		const stateInitializer = async () => {
			try {
				const products = await getProducts();
				const cartJSON = sessionStorage.getItem("cart");
				const cart = JSON.parse(cartJSON);

				dispatch({
					type: "INIT",
					cart,
					products,
				});

				setIsRender(1);
			} catch {}
		};

		stateInitializer();
	}, []);

	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{isRender ? (
				<Router history={history}>
					<Header />
					<Switch>
						<Route path="/" exact={true} component={Products} />
						<Route path="/cart" component={Cart} />
						<Route path="/sell" component={AddProduct} />
					</Switch>
				</Router>
			) : (
				<p>Loading</p>
			)}
		</StateContext.Provider>
	);
};

export { StateContext, history, App as default };
