import React, { useContext } from "react";
import { StateContext } from "../App";

export default () => {
	const { state, dispatch } = useContext(StateContext);
	return (
		<form>
			<input type="text" id="name" />
		</form>
	);
};
