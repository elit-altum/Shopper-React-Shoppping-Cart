import database from "../db/firebase";

// 1. ADD PRODUCT TO FIREBASE
const addProduct = async (product) => {
	try {
		const newProduct = await database.ref("products").push(product);

		return newProduct.key;
	} catch {
		return -1;
	}
};

// 2. GET PRODUCTS FROM DB
const getProducts = async () => {
	try {
		const snapshot = await database.ref("products").once();

		let products = [];
		snapshot.forEach((product) => {
			products.push({
				id: product.id,
				...product.val(),
			});
		});

		return products;
	} catch {
		return -1;
	}
};

export { addProduct, getProducts };
