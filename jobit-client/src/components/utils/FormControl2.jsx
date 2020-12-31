import React from 'react';

// low-level component
class FormControl2 extends React.Component {
	render() {
		const validEles = document.querySelectorAll(".form-control-2 input:valid");

		validEles.forEach(e => {
			e.parentNode.classList.add("active");
		});
	
		const invalidEles = document.querySelectorAll(".form-control-2 input:invalid");

		invalidEles.forEach(e => {
			e.parentNode.classList.remove("active");
		});

		return (
			<div className="form-control form-control-2">
				{ this.props.content }
			</div>
		);
	}
}

export default FormControl2;