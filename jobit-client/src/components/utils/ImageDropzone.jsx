import React from 'react';

const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
// low-level component
class ImageDropzone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataURLs: [],
			className: "",
			text: null
		}
	}

	readBlobs(blob) {
		if (!blob) return ;
		
		if (allowedFileTypes.indexOf(blob.type) <= -1) {
			this.setState({
				className: "",
				text: null
			})

			return ;
		}

		const reader = new FileReader();

		reader.onload = blob => {
			this.setState({
				dataURLs: reader.result
			});
		}

		if (blob) {
			reader.readAsDataURL(blob)
			if (this.props.getBlob !== null && typeof this.props.getBlob === 'function') {
				this.props.getBlob(blob);
			}
		};

		this.setState({
			className: "",
			text: null
		})
	}

	onInputChange(e) {
		this.readBlobs(e.target.files[0]);
		e.target.files = null;
	}

	onDragOver(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			className: "hold",
			text: "Release to upload"
		})
	}

	onDragLeave(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			className: "",
			text: null
		})
	}

	onDrop(e) {
		e.preventDefault();
		e.stopPropagation();
		this.readBlobs(e.dataTransfer.files[0]);
	}

	render() {
		const props = this.props;
		const state = this.state;

		return (
			<div className={ "dropzone " + (props.className || " ") + (this.state.className || " ") +
			(state.dataURLs.length !== 0 ? "dropzone-fulfilled" : "") }>
				<label forhtml={ props.id || "dropzone-label" }
				onDragLeave={ this.onDragLeave.bind(this) }
				onDragOver={ this.onDragOver.bind(this) }
				onDrop={ this.onDrop.bind(this) }>
					<input id={ props.id || "dropzone-label" } type="file"
					onChange={ this.onInputChange.bind(this) }/>
				</label>
				<div className="text">
					<i className="fas fa-plus"></i>
					<p className="margin-none margin-top">
						{
							(state.text !== null ?
								state.text : 
								props.text || "Drop image or click here to select")
						}
					</p>
				</div>
				<img alt="ava" src={ state.dataURLs }
				className={ "preview " + props.previewClassName }/>
			</div>
		);
	}
}

export default ImageDropzone;