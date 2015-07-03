class Display extends React.Component {
	render() {

		let operations = [];

		this.props.operations.forEach(function(operation, index){
			currentOperator = operation.type;
			operations.push(<li key={index}><div className="operator">{operation.type}</div>{operation.value}</li>)
		});

		let currentValue = this.props.currentValue;
		let currentOperator = this.props.currentOperator;

		return <div className="display">
			<ul>
				{operations}
			</ul>
			<div className="active__operator">{currentOperator}</div><input type="number" readOnly value={currentValue} />
		</div>;

	  }
}