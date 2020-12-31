import React from 'react';

class ErrorMessage extends React.Component {
	render() {
		return (
			<p className="text-error">{ this.props.content }</p>
		);
	}
}

export default ErrorMessage