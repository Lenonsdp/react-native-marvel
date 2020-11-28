import React, { useState, useEffect } from 'react';
import Herois from './components/Herois';
import { StyleSheet, Text, ScrollView, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
	const [access, setAccess] = useState(0);

	useEffect(() => {
		async function onReadAsync() {
			const jsonValue = await AsyncStorage.getItem('@ACCESS')
			if (!jsonValue) {
				await AsyncStorage.setItem('@ACCESS', JSON.stringify({ qtd: 1 }))
			} else {
				var parsed = JSON.parse(jsonValue);
				var totalAccess = parseInt(parsed.qtd) + 1;
				await AsyncStorage.setItem('@ACCESS', JSON.stringify({ qtd: totalAccess }))
				setAccess(totalAccess);
			}
		}	
		onReadAsync();
	}, []);

	return (
		<View style={styles.background}>
			<Text style={styles.header}>Marvel</Text>
	<Text style={styles.info}>Quantidades de acesso no site:{access}</Text>
			<Herois />
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		color: "#ff0000",
		backgroundColor: "#000",
		textAlign: "center",
		padding: 20,
		fontSize: 24
	},
	info: {
		color: "#fFf",
		backgroundColor: "#000",
		textAlign: "left",
		padding: 5,
		fontSize: 10
	},
	background: {
		backgroundColor: "#fff",
		flex: 1,
	},
});