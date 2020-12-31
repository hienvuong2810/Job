import React from "react";

// low-level component
class TableA extends React.Component {
    render() {
        const props = this.props;

        return (
            <table id={this.props.id} className="table-a">
                {props.head}
                <tbody>
                    {props.body}
                    {props.form}
                </tbody>
            </table>
        );
    }
}

export default TableA;
