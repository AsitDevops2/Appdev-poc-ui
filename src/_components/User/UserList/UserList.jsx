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
        
        this.deleteRecord = this.deleteRecord.bind(this);

    }

    componentDidMount() {
        let loggedUser = JSON.parse(localStorage.getItem('user'));

        if(loggedUser.id==1)
        {
            this.props.getAll();
        }
        else
        {
            this.props.getByParent(loggedUser.id);
        }
    }

    deleteRecord(id) {
        if (confirm('Sure want to delete?') && id != null)
            this.props.deleteRecord(id);
    }
    render() {
        let users={items:[]};
        let loggedUser = JSON.parse(localStorage.getItem('user'));
    
        if(this.props.users != null && this.props.users.items != null){
            users = this.props.users;
        } 
        return (
            <div className="container" id="user">
                <br/>
                <h2 style={{fontFamily:'cursive',margin:'auto'}}><i>USER DATA</i></h2><br/>
                <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Department</th>
                    {/* <th>Role</th> */}
                    <th>Actions</th>
                </tr>
                </thead>
                {/* <tbody>
                <tr>
                    {users.items.map((user, index) =>
                            <td key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                :<button>Delete</button>
                            </td>                    
                    )}
                    <td>

                        <button>Edit</button>
                    </td>
                </tr> */}
                
                <tbody>
                    {users.items.map((user, index) => {
                        return(
                            <tr key={user.id}>
                                <td>{user.firstName + ' '+ user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.addr1}</td>
                                <td>{user.city}</td>    
                                <td>{user.dept}</td>
                                {/* <td>{user.role}</td> */}
                                <td>
                                {/* <Link to='/editPage' params={{id:user.id}} className="btn btn-success" style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faEdit}/></Link>  */}
                                {/* <button  className="btn btn-success" onClick={()=>this.editRecord(user)} style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faEdit}/></button>  */}
                                <Link to={{pathname: `/editPage/${user.id}`}} className="btn btn-success" style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faEdit}/></Link> 
                                <button  className="btn btn-danger" onClick={()=>this.deleteRecord(user.id)} style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                </td>
                            </tr>
                        )
            })}

{/* onClick={()=>this.props.getById(user.id)} */}
                           
                </tbody>
                </table> 
                
                <Link to="/addUser" className="btn btn-success" style={{marginLeft: '10px'}}>Add User</Link>
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
    deleteRecord: userActions.delete,
    getByParent: userActions.getByParent
}

const connectedUserList = connect(mapState, actionCreators)(UserList);
export { connectedUserList as UserList };
