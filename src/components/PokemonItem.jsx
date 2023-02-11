export default function PokemonItem(props) {
    return (
      <li className="list-item">
        <h3>{props.name}</h3>
        {props.image ? <img src={`${props.image}/low.png`} /> : <img src={`https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`} />}
        <button onClick={props.checkBtn}>Choose</button>        
      </li>
    );
  }
  