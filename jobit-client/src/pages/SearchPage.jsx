import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {proxy} from "../fetch.js";
import {getListSearchJP} from '../actions/searchAction.js';
import '../components/jobposts/jobpost.css';
import TableA from '../components/utils/TableA.jsx';
const mapStateToProps = (store) => {
    return {
      list: store.search.list_job,
      headings: store.jobpost.headings,
    }
  }


class SearchPage extends Component {
    constructor(props){
        super(props)
    
    }
    componentDidMount() {
        console.log(this.props.match.params.query)
        this.props.dispatch(getListSearchJP(this.props.match.params.query));
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
        console.log(Object.keys(this.props.list).length) ;
        let bodies = this.props.list.map((data, index) => {
            return <tr key={index} >
                      <td className="text-center">{ data.title }</td>
                      <td className="text-center">{ data.descriptions }</td>
                      <td className="text-center">{ data.requirements }</td>
                      <td className="pointer text-center">{ data.expiredDate || data.expired_date }</td>
                      <td className="pointer text-center">{ data.salary }</td>
                    </tr>;
          })

        return (
            <TableA 
            head = {

                <Fragment>
                {
                    headings
                }
                </Fragment>

            }
                 body = {
                                <Fragment>
                                    {
                                        bodies
                                    }
                                </Fragment>

                              }

               />
        )
    }
}


export default connect(mapStateToProps)(SearchPage);