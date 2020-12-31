import React from 'react';

// lowlevel-component
class ProgressBar extends React.Component {
	render() {
		const progress = (this.props.progress / this.props.max) * 100;
		
		return (
			<div className="progress-bar margin-y-small">
				<div className="progress"
				style={{ width: progress + '%' }}></div>
			</div>
		);
	}
}

export default ProgressBar;