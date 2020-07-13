function appReducer(state, action) {
	switch (action.type) {
		case "ADD_TO_CART":
			return { cart: state.card.append(action.item) };
		case "decrement":
			return { count: state.count - 1 };
		default:
			throw new Error();
	}
}

export default appReducer;
