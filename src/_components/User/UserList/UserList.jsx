import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userActions } from '../../../_actions';
import Pagination from "react-js-pagination";
import React, { Component } from 'react';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            total: 0,
            data: [],
            serachTxt: "",
            filterData: []
        };
        this.deleteRecord = this.deleteRecord.bind(this);
        this.filterData = this.filterData.bind(this);

    }

    componentDidMount() {
        this.props.getAll();
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.users && nextProps.users.items && nextProps.users.items !== this.state.data) {
            let len = nextProps.users.items.length;
            let arr = JSON.parse(JSON.stringify(nextProps.users.items));
            this.setState({ data: arr.slice(0, 5), total: len });
        }
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let len = this.state.filterData.length;
        let arr = len ? JSON.parse(JSON.stringify(this.state.filterData)) : JSON.parse(JSON.stringify(this.props.users.items));

        if (pageNumber > 1) {
            let start = (pageNumber - 1) * 5;
            let end = start + 5;
            let data = arr.filter((row, index) => {
                return index >= start && index < end;
            })
            this.setState({ activePage: pageNumber, data: data });
        }else {
            this.setState({ activePage: pageNumber, data: arr.slice(0, 5) });
        }

    }

    filterData(e) {
        let text = e.target.value;
        let arr = JSON.parse(JSON.stringify(this.props.users.items));
        if (text.length >= 1) {
            let data = arr.filter(obj => Object.values(obj).some(val => {
                console.log(val);
                return val.toString().toLowerCase().includes(text.toLowerCase());
            }));
            let flitArr = JSON.parse(JSON.stringify(data));
            flitArr = flitArr.slice(0, 5);

            this.setState({ data: flitArr, activePage: 1, total: data.length, filterData: data });
        }
        else {
            this.setState({ data: arr.slice(0, 5), activePage: 1, filterData: [] });
        }

    }

    deleteRecord(id) {
        if (confirm('Sure want to delete?') && id != null)
            this.props.deleteRecord(id);
    }
    render() {
        // let users={items:[]};
        let loggedUser = JSON.parse(localStorage.getItem('user'));

        // if(this.props.users != null && this.props.users.items != null){
        //     users = this.props.users;
        // } 
        return (
            <div className="container" id="user">
                <br />
                <h2 style={{ fontFamily: 'cursive', margin: 'auto' }}><i>USER DATA</i></h2><br />
                <div className="row">
                    <div classname="col-md-8 form-group" style={{ width: '35%', marginLeft: '15px' }}>
                        <input type="text" name="searchValue" placeholder="Search" className="form-control"
                            onKeyUp={this.filterData}></input><br />
                    </div>
                    <div classname="col-md-4 form-group" style={{ marginLeft: 'auto', marginRight: '15px' }}>
                        <Link to="/addUser" className="btn btn-success" >Add User</Link>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No.</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((user, index) => {
                            if (loggedUser.id == user.parent) {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.firstName + ' ' + user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.addr1}</td>
                                        <td>{user.city}</td>
                                        <td>{user.dept}</td>
                                        <td>
                                            {/* <Link to='/editPage' params={{id:user.id}} className="btn btn-success" style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faEdit}/></Link>  */}
                                            {/* <button  className="btn btn-success" onClick={()=>this.editRecord(user)} style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faEdit}/></button>  */}
                                            <Link to={{ pathname: `/editPage/${user.id}` }} className="btn btn-success" style={{ marginLeft: '10px' }}><FontAwesomeIcon icon={faEdit} /></Link>
                                            <button className="btn btn-danger" onClick={() => this.deleteRecord(user.id)} style={{ marginLeft: '10px' }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </td>
                                    </tr>
                                )
                            }

                        })}


                    </tbody>
                </table>
                <br /><br />

                <Pagination

                    activePage={this.state.activePage}

                    itemsCountPerPage={5}

                    totalItemsCount={1}

                    pageRangeDisplayed={5}

                    itemClass="page-item"

                    linkClass="page-link"

                    onChange={this.handlePageChange.bind(this)} />

            </div>
        )
    }
}

function mapState(state) {
    const { authentication } = state;
    const { users } = state;
    return { users };
}


const actionCreators = {
    getAll: userActions.getAll,
    deleteRecord: userActions.delete
}

const connectedUserList = connect(mapState, actionCreators)(UserList);
export { connectedUserList as UserList };
