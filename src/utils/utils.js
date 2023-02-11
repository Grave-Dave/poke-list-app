// checking if chracters from pokemon array are pokemons or diffrent characters

export default async function checkCharacterData(arr) {
	let newArr = [];

	for (let el of arr) {
		await fetch(`https://api.tcgdex.net/v2/en/cards/${el.id}`)
			.then(res => res.json())
			.then(data => {
				if (data.category === 'Pokemon') {
					newArr.push(true);
				} else {
					newArr.push(false);
				}
			});
	}
	return newArr;
}
