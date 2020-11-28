import React from "react";
import { useFindHeroesReducer } from '../hooks/useFindHeroesReducer';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView } from "react-native";

function Heroes() {
	const { state } = useFindHeroesReducer();
	const { data, loading, error } = state;
	const Item = ({ title, image }) => (
		<View style={styles.item}>
			<Text style={styles.title}>{title}</Text>
			<Image
				style={styles.tinyLogo}
				source={{
					uri: image,
				}}
			/>
		</View>
	);

	const renderItem = ({ item }) => (
		<Item title={item.name} image={item.thumbnail.path + '.' + item.thumbnail.extension} />
	);
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={item => item.id.toString()}
			/>
		</SafeAreaView>
	);
}
export default Heroes;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
	},
	item: {
		backgroundColor: "#000",
		padding: 10,
		marginVertical: 8,
		marginHorizontal: 16,
		alignItems: "center"
	},
	title: {
		fontSize: 20,
		color: '#FF0000'
	},
	error: {
		color: "#FF0000",
		fontSize: 24,
		textAlign: "center",
	},
	tinyLogo: {
		width: 100,
		height: 100,
	},
});