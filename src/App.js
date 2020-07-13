import React, { useReducer, useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import appReducer from "./reducers/appReducer";
import { getProducts } from "./actions/firebaseActions";

import AddProduct from "./components/addProduct";

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
				const cart = sessionStorage.getItem("cart");
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
					<Switch>
						<Route path="/" exact={true} />
						<Route path="/cart" />
						<Route path="/add" component={AddProduct} />
					</Switch>
				</Router>
			) : (
				<p>Loading</p>
			)}
		</StateContext.Provider>
	);
};

export { StateContext, App as default };
