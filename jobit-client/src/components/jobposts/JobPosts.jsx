import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { getList, updateForm, submitForm, deleteJobpost, activeJobpost } from '../../actions/jobpostActions.js';
import TableA from '../utils/TableA.jsx';
import './jobpost.css';
import { validateJobpost } from '../../validators/jobpostValidator';

const mapStateToProps = (store) => {
  return {
    list: store.jobpost.list,
    form: store.jobpost.form,
    headings: store.jobpost.headings
  }
}

export default connect(mapStateToProps)(class JobPosts extends Component {

    componentDidMount() {
      this.props.dispatch(getList());
    }

    onChangeHandler = event => {

      event.preventDefault();
      this.props.dispatch(updateForm(event.target.id, event.target.value))

    }

    submitFormHandler = event => {

      if (event.keyCode === 13) {
        let result = validateJobpost(this.props.form)
        if (!result.ok) {
          console.log(result.msg)
        } else {
          this.props.dispatch(submitForm(this.props.form))
        }
      }


    }

    clickHandler(data, index) {

      this.props.dispatch(activeJobpost(data))

    }

    render() {

      let headings = <thead>
                        <tr>{
                          this.props.headings.map((heading, index) => {
                            return <th key={index}>{heading}</th>
                          })
                        }
                        </tr>
                      </thead>

      let bodies = this.props.list.map((data, index) => {
        return <tr key={index} onClick={this.clickHandler.bind(this, data, index)}>
                  <td className="text-center">{ data.title }</td>
                  <td className="text-center">{ data.descriptions }</td>
                  <td className="text-center">{ data.requirements }</td>
                  <td className="pointer text-center">{ data.expiredDate || data.expired_date }</td>
                  <td className="pointer text-center">{ data.salary }</td>
                </tr>;
      })

      let formElements = this.props.headings.map((heading, index) => {
        return (<div key={index}>
                  <label htmfor={heading}>{heading}</label>
                  <input type="text" value={this.props.form[heading.toLowerCase()]} onChange={this.onChangeHandler} id={heading.toLowerCase()} name={heading.toLowerCase()} placeholder={heading}/>
               </div>
             )
      })


      return (
        <div>
          <h1>Still testing api</h1>
          {
            this.props.list === 0 ? <h1>Not found!!!</h1> :
            <Fragment>

                <TableA head = {

                  <Fragment>
                    {
                      headings
                    }
                  </Fragment>

                  }

                   body = {

  								<Fragment>
  									{
  										//bodies
  									}
  								</Fragment>

  							  }

                 />

            </Fragment>
          }
          <h1>Create Jobpost</h1>
          <div className="container">
            <form onKeyUp={this.submitFormHandler}>
              {formElements}
            </form>

          </div>
        </div>

      )
    }
  }
)
