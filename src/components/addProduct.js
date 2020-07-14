import React, { useContext, useState } from "react";
import { StateContext } from "../App";

import { Form, Button } from "react-bootstrap";

import { toast } from "react-toastify";

export default () => {
	const { state, dispatch } = useContext(StateContext);
	const [isLoading, setIsLoading] = useState(false);

	const submitProductForm = (e) => {
		setIsLoading(true);

		e.preventDefault();
		const product = {
			name: document.getElementById("product-name").value,
			price: document.getElementById("product-price").value,
			description: document.getElementById("product-description").value,
			image: document.getElementById("product-image").value,
			sellerName: document.getElementById("product-seller").value,
			sellerEmail: document.getElementById("product-contact").value,
		};

		dispatch({
			type: "ADD_TO_STORE",
			product,
		});

		toast.success("Product added successfully!", {
			autoClose: 2000,
		});
	};

	return (
		<div className="add-product__page">
			<Form onSubmit={submitProductForm}>
				<Form.Group>
					<h5>Product Information</h5>
					<Form.Label size="sm">Product Name</Form.Label>
					<Form.Control type="text" id="product-name" required size="sm" />
					<Form.Label size="sm">Price</Form.Label>
					<Form.Control type="tel" id="product-price" required size="sm" />
					<Form.Label size="sm">Image URL</Form.Label>
					<Form.Control type="text" id="product-image" required size="sm" />
					<Form.Label size="sm">Product Description</Form.Label>
					<Form.Control
						type="text"
						id="product-description"
						required
						size="sm"
					/>
				</Form.Group>

				<Form.Group>
					<h5>Seller Information</h5>
					<Form.Label size="sm">Seller Name</Form.Label>
					<Form.Control type="text" id="product-seller" required size="sm" />
					<Form.Label size="sm">Seller Email</Form.Label>
					<Form.Control type="email" id="product-contact" required size="sm" />
				</Form.Group>
				<Button variant="primary" type="submit" disabled={isLoading}>
					Submit
				</Button>
			</Form>
		</div>
	);
};
