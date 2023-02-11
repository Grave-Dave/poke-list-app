import { useEffect, useState } from 'react';
import Abilites from './components/Abilities';
import PokemonItem from './components/PokemonItem';
import pokeball from './img/pokeball.png';
import checkCharacterData from './utils/utils';

export default function App() {
	const [pokemons, setPokemons] = useState([]);
	const [wasChosen, setWasChosen] = useState(false);
	const [chosen, setChosen] = useState(null);
	const [reload, setReload] = useState(false);

	// getting 5 random pokemons data from API
	function getPokemonsData(data) {
		const numArr = [];
		let randomNums = 5;
		while (numArr.length < randomNums) {
			let num = Math.floor(Math.random() * data.length);
			if (numArr.indexOf(num) === -1 && num > 5) numArr.push(num);
		}
		const pokemonArr = numArr.map(el => data[el]);

		checkCharacter(checkCharacterData(pokemonArr), pokemonArr);
	}

	// if our random pokemon array has pokemons only - set cards, if not - getting new random pokemons data
	async function checkCharacter(data, pokemonArr) {
		const characterData = await data;
		if (characterData.reduce((a, b) => a * b) === 0) {
			fetch('https://api.tcgdex.net/v2/en/cards')
				.then(res => res.json())
				.then(data => {
					getPokemonsData(data);
				});
		} else if (characterData.reduce((a, b) => a * b) === 1) {
			getCards(pokemonArr);
		}
	}

	function getCards(arr) {
		setPokemons(arr);
	}

	// setting chosen pokemon based on pokemon id
	function checkBtn(id) {
		setChosen(pokemons.filter(pokemon => pokemon.id === id));
		setWasChosen(prevState => !prevState);
	}

	useEffect(() => {
		chosen &&
			fetch(`https://api.tcgdex.net/v2/en/cards/${chosen[0].id}`)
				.then(res => res.json())
				.then(data => {
					setChosen(data);
				});
	}, [wasChosen]);

	// handling pokemon reload btn
	function handleClick() {
		setReload(prevState => !prevState);
	}

	useEffect(() => {
		fetch('https://api.tcgdex.net/v2/en/cards')
			.then(res => res.json())
			.then(data => {
				getPokemonsData(data);
			});
	}, [reload]);

	return (
		<div className='App'>
			<div className='hero'>
				<h1>Poke list</h1>
				<p>Choose your Pokemon Ash!</p>
				<button className='hero-btn' onClick={handleClick}>
					Try another
				</button>
				<img className='poke1' src={pokeball} alt='pokeball' />
				<img className='poke2' src={pokeball} alt='pokeball' />
			</div>
			{pokemons.length ? (
				<ul className='poke-list'>
					{pokemons.map(pokemon => (
						<PokemonItem key={pokemon.id} {...pokemon} checkBtn={() => checkBtn(pokemon.id)} />
					))}
				</ul>
			) : (
				<h3>Pokemons loading...</h3>
			)}
			{chosen && (
				<div className='chosen'>
					<i onClick={() => setChosen(null)} className='fa-regular fa-circle-xmark'></i>
					<div>
						{chosen.image ? (
							<img src={`${chosen.image}/low.png`} alt='pokemon' />
						) : (
							<img
								src={`https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`}
							/>
						)}
					</div>
					<div className='details'>
						<h1>{chosen.name}</h1>
						<p>
							<i className='fa-solid fa-percent'></i> rarity: {chosen.rarity}
						</p>
						<p>
							<i className='fa-solid fa-heart'></i> life: {chosen.hp} hp
						</p>
						<p>
							<i className='fa-solid fa-dna'></i> type: {chosen.types && <span>{chosen.types[0]}</span>}
						</p>
						<h3>
							<i className='fa-solid fa-hand-fist'></i> attacks:
						</h3>
						{chosen.attacks ? (
							chosen.attacks.map((el, i) => {
								return <Abilites key={i} {...el} />;
							})
						) : (
							<p className='ability'>none</p>
						)}
						<h3>
							<i className='fa-solid fa-skull-crossbones'></i> weaknesses:
						</h3>
						{chosen.weaknesses ? (
							chosen.weaknesses.map((el, i) => {
								return <Abilites key={i} {...el} />;
							})
						) : (
							<p className='ability'>none</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
