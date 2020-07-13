import database from "../db/firebase";
import { addProduct } from "../actions/firebaseActions";

function appReducer(state, action) {
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
			return { products: newProducts };

		// 2. ADDING NEW ITEM TO CART
		case "ADD_TO_CART":
			break;

		// 3. DEFAULT STATE
		default:
			return {
				products: newProducts,
				cart: newCart,
			};
	}
}

export default appReducer;
