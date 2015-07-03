class Calculator extends React.Component {
	constructor(props) {
	    super(props);
	    this.doOperation = function(value, operation){

	    	if(!operation.type){
	    		return parseFloat(operation.value);
	    	}

	    	switch(operation.type){
	    		case '+':
	    			return value + parseFloat(operation.value);
	    		break;
	    	}

	    }
	    this.state = {
	    	operations: props.operations,
	    	currentValue : props.currentValue,
	    	currentOperator : props.currentOperator
	    };
	}
	updateCurrentStringValue(newValue) {
		let value = this.state.currentValue == '0' ? newValue.toString() : this.state.currentValue += newValue.toString();
		this.setState({
			currentValue : value
		});
	}
	setOperation(type) {

		let operations = this.state.operations;
		let currentValue = this.state.currentValue;
		let currentOperator = this.state.currentOperator;
	
		switch(type) {
			case '+':
				if(currentOperator == '=' || currentValue == '0'){
					currentValue = '0';
					currentOperator = '+';
				} else {
					if(!operations.length){
						operations.push({value : currentValue});
						currentValue = '0';
						currentOperator = '+';
					} else {
						operations.push({value : currentValue, type : '+'});
						currentOperator = '+';
						currentValue = '0';
					}
				}

			break;
			case 'CE':
				currentValue = '0';
				currentOperator = '';
			break;
			case 'C':
				operations = [];
				currentValue = '0';
				currentOperator = '';
			break;
			case '=':

				if(currentValue != '0' && ['+'].indexOf(currentOperator) !== -1){
					operations.push({value : currentValue, type : currentOperator});
				}

				let result = 0;

				operations.forEach(function(op){
					result = this.doOperation(result, op);
				}.bind(this));

				currentValue = result.toString();
				currentOperator = '=';

			break;
		}
		
		this.setState({
			operations : operations,
			currentValue : currentValue,
			currentOperator : currentOperator
		});
	}
  	render() {
    	return <div>
	    	<Display operations={this.state.operations} currentValue={this.state.currentValue} currentOperator={this.state.currentOperator} />
	    	<Operators setOperation={this.setOperation.bind(this)} />
	    	<NumberPad numberPress={this.updateCurrentStringValue.bind(this)} />
    	</div>;
  	}
}

Calculator.propTypes = { operations: React.PropTypes.array, currentValue : React.PropTypes.string, currentOperator : React.PropTypes.string };
Calculator.defaultProps = { 
	operations: [],
	currentValue: '0',
	currentOperator: ''
};

React.render(
  <Calculator />,
  document.getElementById('calculator')
);