class Operators extends React.Component {
  	setOperator(operator) {
  		this.props.setOperation(operator);
  	}
  	render() {
    	return <ul className="operators">
    		<button onClick={this.setOperator.bind(this, 'C')}>C</button>
    		<button onClick={this.setOperator.bind(this, 'CE')}>CE</button>
    		<button onClick={this.setOperator.bind(this, '+')}>+</button>
    		<button onClick={this.setOperator.bind(this, '=')}>=</button>
    	</ul>;
  	}
}
