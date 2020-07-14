import React, { useContext } from "react";
import { ListGroup, Image, Button } from "react-bootstrap";

import { StateContext } from "../App";

const CartItem = ({ product, dispatch }) => {
	return (
		<ListGroup.Item>
			<div className="cart-item">
				<div className="cart-image">
					<Image src={product.image} roundedCircle style={{ width: "80px" }} />
				</div>
				<div className="cart-product">
					<p className="cart-product__name">{product.name}</p>
					<p className="cart-product__price">₹{product.price}</p>
				</div>
				<div className="cart-quantity">
					<p className="cart-product__qty">Quantity: {product.qty}</p>
					<p className="cart-product__amount">₹{product.qty * product.price}</p>
					<div className="action-buttons">
						<button
							className="remove-button"
							onClick={() =>
								dispatch({
									type: "REMOVE_FROM_CART",
									product,
								})
							}
						>
							-
						</button>
						<button
							className="add-button"
							onClick={() =>
								dispatch({
									type: "ADD_TO_CART",
									product,
								})
							}
						>
							+
						</button>
					</div>
				</div>
			</div>
		</ListGroup.Item>
	);
};

export default () => {
	const { state, dispatch } = useContext(StateContext);
	const cartTotal = () => {
		let total = 0;
		state.cart.forEach((item) => {
			total = total + item.qty * item.price;
		});
		return total;
	};
	return (
		<div className="cart-page">
			<h3>My Cart</h3>
			{cartTotal() ? (
				<div className="cart-content">
					<div className="cart-details">
						<ListGroup>
							{state.cart.map((item) => (
								<CartItem product={item} dispatch={dispatch} key={item.id} />
							))}
						</ListGroup>
					</div>
					<div className="cart-summary">
						<h4>Cart Summary</h4>
						<p className="cart-summary__total">Pay: ₹{cartTotal()}</p>
						<Button
							size="sm"
							disabled={!cartTotal()}
							onClick={() =>
								dispatch({
									type: "CHECK_OUT",
								})
							}
						>
							Checkout
						</Button>
					</div>
				</div>
			) : (
				<h5>Add items to your cart!</h5>
			)}
		</div>
	);
};
