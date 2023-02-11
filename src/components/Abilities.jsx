export default function Abilites(props) {
	return (
		<div>
			{props.type ? (
				<p className="ability">
					 {`type: ${props.type} | value: ${props.value}`}
				</p>
			) : (
				<p className="ability">
					{`${props.name} |`}
					<span> {props.damage ? 'damage: ' + props.damage : 'damage: 0'}</span>
				</p>
			)}
		</div>
	);
}
