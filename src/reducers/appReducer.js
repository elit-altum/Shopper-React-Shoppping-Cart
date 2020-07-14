import { addProduct } from "../actions/firebaseActions";

const appReducer = (state, action) => {
	let newProducts = state.products;
	let newCart = state.cart;

	switch (action.type) {
		// 1. ADDING NEW ITEM TO STORE
		case "ADD_TO_STORE":
			addProduct(action.product).then((id) => {
				if (id !== -1) {
					newProducts = state.products.concat([
						{
							id,
							...action.product,
						},
					]);
					return {
						products: newProducts,
						cart: newCart,
					};
				}
			});

			return {
				products: newProducts,
				cart: newCart,
			};

		// 2. ADDING NEW ITEM TO CART
		case "ADD_TO_CART":
			// newCart = state.cart.concat([action.product]);
			let found = 0;

			newCart.forEach((product) => {
				if (product.id === action.product.id) {
					product.qty = product.qty + 1;
					found = 1;
				}
			});

			if (!found) {
				newCart = newCart.concat([
					{
						...action.product,
						qty: 1,
					},
				]);
			}
			const JSONCart = JSON.stringify(newCart);
			sessionStorage.setItem("cart", JSONCart);

			return {
				cart: newCart,
				products: newProducts,
			};

		// 3. REMOVING ITEM FROM CART
		case "REMOVE_FROM_CART":
			let itemFound = 0;
			newCart.forEach((item) => {
				if (item.id === action.product.id && item.qty > 1) {
					item.qty = item.qty - 1;
					itemFound = 1;
				}
			});

			if (!itemFound) {
				newCart = state.cart.filter((item) => item.id !== action.product.id);
			}

			const filterCart = JSON.stringify(newCart);
			sessionStorage.setItem("cart", filterCart);

			return {
				cart: newCart,
				products: newProducts,
			};

		// 4. CHECKING OUT
		case "CHECK_OUT":
			sessionStorage.setItem("cart", null);

			return {
				cart: [],
				products: newProducts,
			};

		// 4. SET THE STATE
		case "INIT":
			return {
				cart: action.cart || newCart,
				products: action.products || newProducts,
			};

		// 5. DEFAULT STATE
		default:
			return {
				products: newProducts,
				cart: newCart,
			};
	}
};

export default appReducer;
