import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";

import { StateContext } from "../App";

const Product = ({ product, dispatch }) => {
	return (
		<div className="product-card">
			<Card>
				<Card.Img
					variant="top"
					src={product.image}
					fluid
					alt={`${product.name}'s image`}
				/>
				<p className="title">{product.name}</p>
				<p className="card-price">₹ {product.price}</p>
				<p className="card-desc">
					{product.description.length > 40
						? `${product.description.substring(0, 40)}...`
						: product.description}
				</p>
				<p className="sold-by">Sold By:</p>
				<p className="seller">{product.sellerName}</p>
				<Button
					size="sm"
					onClick={() =>
						dispatch({
							type: "ADD_TO_CART",
							product,
						})
					}
				>
					Add To Cart
				</Button>
			</Card>
		</div>
	);
};

export default () => {
	const { state, dispatch } = useContext(StateContext);
	return (
		<div className="products-page">
			<div className="products-list">
				{state.products.map((product) => (
					<Product product={product} key={product.id} dispatch={dispatch} />
				))}
			</div>
		</div>
	);
};
