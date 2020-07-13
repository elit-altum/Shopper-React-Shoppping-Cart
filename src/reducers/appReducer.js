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
				}
			});

			return {
				products: newProducts,
			};

		// 2. ADDING NEW ITEM TO CART
		case "ADD_TO_CART":
			newCart = state.cart.concat([action.product]);
			sessionStorage.setItem("cart", newCart);

			return {
				cart: newCart,
			};

		// 3. REMOVING ITEM FROM CART
		case "REMOVE_FROM_CART":
			newCart = state.cart.filter((item) => item.id !== action.product.id);
			sessionStorage.setItem("cart", newCart);

			return {
				cart: newCart,
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
