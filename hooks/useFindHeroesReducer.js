import { useEffect, useReducer } from "react";

const initialState = {
	loading: true,
	data: [],
	error: null,
};
const reduce = (state, action) => {

	switch (action.type) {
		case "OnFetching":
			return {
				loading: true,
				data: [],
				error: null,
			};
		case "OnSuccess":
			return {
				loading: false,
				data: action.payload,
				error: null,
			};
		case "OnFailure":
			return {
				loading: false,
				data: [],
				error: "Lamento, ocorreu um erro!",
			};
		default:
			return state;
	}
};

export function useFindHeroesReducer(search) {
	const [state, dispatch] = useReducer(reduce, initialState);

	useEffect(() => {
		async function listHeroes() {
			fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=ad3d24784b7186399a04c963fe91d760&hash=2cb10ea76a529effe2eee446d1d6fb87', {
				method: 'GET'
			})
				.then((response) => response.json())
				//If response is in json then in success
				.then((responseJson) => {
					// console.log(responseJson);
					//Success 
					if (responseJson.data.results) {
						dispatch({ type: "OnSuccess", payload: responseJson.data.results });
					} else {
						dispatch({ type: "OnFailure" });
					}
				})
				.catch((error) => {
					//Error 
					dispatch({ type: "OnFailure" });
				});
		}
		dispatch({ type: "OnFetching" });
		listHeroes();
	}, []);
	return { state };
}