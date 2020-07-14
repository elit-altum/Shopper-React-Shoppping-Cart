import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { StateContext } from "../App";

export default () => {
	const { state, dispatch } = useContext(StateContext);
	const calculate = () => {
		let items = 0;
		state.cart.forEach((product) => {
			items = items + product.qty;
		});
		return items;
	};
	return (
		<header className="navigation-header">
			<nav>
				<ul>
					<li>
						<Link to="/">Shop</Link>
					</li>
					<li>
						<Link to="/cart">Cart ({calculate()})</Link>
					</li>
					<li>
						<Link to="/sell">Sell</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
