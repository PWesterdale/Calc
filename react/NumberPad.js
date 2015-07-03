class NumberPad extends React.Component {
	numberPress(number) {
		this.props.numberPress(number);
  	}
  	render() {

  		let numberButtons = [];
  		let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'];

  		numbers.forEach(function(number, id){
  			numberButtons.push(<button key={id} onClick={this.numberPress.bind(this, number)}>{number}</button>);
  		}.bind(this));

    	return <div className="numberpad">{numberButtons}</div>;

  	}
}