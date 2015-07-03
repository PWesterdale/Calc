'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Operators = (function (_React$Component) {
	function Operators() {
		_classCallCheck(this, Operators);

		_get(Object.getPrototypeOf(Operators.prototype), 'constructor', this).apply(this, arguments);
	}

	_inherits(Operators, _React$Component);

	_createClass(Operators, [{
		key: 'setOperator',
		value: function setOperator(operator) {
			this.props.setOperation(operator);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'ul',
				{ className: 'operators' },
				React.createElement(
					'button',
					{ onClick: this.setOperator.bind(this, 'C') },
					'C'
				),
				React.createElement(
					'button',
					{ onClick: this.setOperator.bind(this, 'CE') },
					'CE'
				),
				React.createElement(
					'button',
					{ onClick: this.setOperator.bind(this, '+') },
					'+'
				),
				React.createElement(
					'button',
					{ onClick: this.setOperator.bind(this, '=') },
					'='
				)
			);
		}
	}]);

	return Operators;
})(React.Component);

var NumberPad = (function (_React$Component2) {
	function NumberPad() {
		_classCallCheck(this, NumberPad);

		_get(Object.getPrototypeOf(NumberPad.prototype), 'constructor', this).apply(this, arguments);
	}

	_inherits(NumberPad, _React$Component2);

	_createClass(NumberPad, [{
		key: 'numberPress',
		value: function numberPress(number) {
			this.props.numberPress(number);
		}
	}, {
		key: 'render',
		value: function render() {

			var numberButtons = [];
			var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'];

			numbers.forEach((function (number, id) {
				numberButtons.push(React.createElement(
					'button',
					{ key: id, onClick: this.numberPress.bind(this, number) },
					number
				));
			}).bind(this));

			return React.createElement(
				'div',
				{ className: 'numberpad' },
				numberButtons
			);
		}
	}]);

	return NumberPad;
})(React.Component);

var Display = (function (_React$Component3) {
	function Display() {
		_classCallCheck(this, Display);

		_get(Object.getPrototypeOf(Display.prototype), 'constructor', this).apply(this, arguments);
	}

	_inherits(Display, _React$Component3);

	_createClass(Display, [{
		key: 'render',
		value: function render() {

			var operations = [];

			this.props.operations.forEach(function (operation, index) {
				currentOperator = operation.type;
				operations.push(React.createElement(
					'li',
					{ key: index },
					React.createElement(
						'div',
						{ className: 'operator' },
						operation.type
					),
					operation.value
				));
			});

			var currentValue = this.props.currentValue;
			var currentOperator = this.props.currentOperator;

			return React.createElement(
				'div',
				{ className: 'display' },
				React.createElement(
					'ul',
					null,
					operations
				),
				React.createElement(
					'div',
					{ className: 'active__operator' },
					currentOperator
				),
				React.createElement('input', { type: 'number', readOnly: true, value: currentValue })
			);
		}
	}]);

	return Display;
})(React.Component);

var Calculator = (function (_React$Component4) {
	function Calculator(props) {
		_classCallCheck(this, Calculator);

		_get(Object.getPrototypeOf(Calculator.prototype), 'constructor', this).call(this, props);
		this.doOperation = function (value, operation) {

			if (!operation.type) {
				return parseFloat(operation.value);
			}

			switch (operation.type) {
				case '+':
					return value + parseFloat(operation.value);
					break;
			}
		};
		this.state = {
			operations: props.operations,
			currentValue: props.currentValue,
			currentOperator: props.currentOperator
		};
	}

	_inherits(Calculator, _React$Component4);

	_createClass(Calculator, [{
		key: 'updateCurrentStringValue',
		value: function updateCurrentStringValue(newValue) {
			var value = this.state.currentValue == '0' ? newValue.toString() : this.state.currentValue += newValue.toString();
			this.setState({
				currentValue: value
			});
		}
	}, {
		key: 'setOperation',
		value: function setOperation(type) {

			var operations = this.state.operations;
			var currentValue = this.state.currentValue;
			var currentOperator = this.state.currentOperator;

			switch (type) {
				case '+':
					if (currentOperator == '=' || currentValue == '0') {
						currentValue = '0';
						currentOperator = '+';
					} else {
						if (!operations.length) {
							operations.push({ value: currentValue });
							currentValue = '0';
							currentOperator = '+';
						} else {
							operations.push({ value: currentValue, type: '+' });
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

					if (currentValue != '0' && ['+'].indexOf(currentOperator) !== -1) {
						operations.push({ value: currentValue, type: currentOperator });
					}

					var result = 0;

					operations.forEach((function (op) {
						result = this.doOperation(result, op);
					}).bind(this));

					currentValue = result.toString();
					currentOperator = '=';

					break;
			}

			this.setState({
				operations: operations,
				currentValue: currentValue,
				currentOperator: currentOperator
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(Display, { operations: this.state.operations, currentValue: this.state.currentValue, currentOperator: this.state.currentOperator }),
				React.createElement(Operators, { setOperation: this.setOperation.bind(this) }),
				React.createElement(NumberPad, { numberPress: this.updateCurrentStringValue.bind(this) })
			);
		}
	}]);

	return Calculator;
})(React.Component);

Calculator.propTypes = { operations: React.PropTypes.array, currentValue: React.PropTypes.string, currentOperator: React.PropTypes.string };
Calculator.defaultProps = {
	operations: [],
	currentValue: '0',
	currentOperator: ''
};

React.render(React.createElement(Calculator, null), document.getElementById('calculator'));
//# sourceMappingURL=bundle.js.map