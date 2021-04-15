import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { faEdit,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userActions } from '../../_actions';

import React, { Component } from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.deleteRecord = this.deleteRecord.bind(this);

       // this.editRecord = this.editRecord.bind(this);
    }
    // editRecord(user){
    //     console.log('On edit'+ id);
    //   //  this.props.editRecord(user);
    //     if(user!=null)
    //     this.props.editRecord(user.id);
    //  }
   
    componentDidMount() {
        this.props.getAll();
    }

    deleteRecord(id) {
        if( confirm('Sure want to delete?')&&id != null)
            this.props.deleteRecord(id);  
    }
    render() {
        let users={items:[]};
        let loggedUser=JSON.parse(localStorage.getItem('user'));
    
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
                    <th>Actions</th>
                </tr>
                </thead>
                
                <tbody>
                    {users.items.map((user, index) => {
                        if(loggedUser.id==user.parent)
                        {
                            return(
                            
                                <tr key={user.id}>
                                    <td>{user.firstName + ' '+ user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.addr1}</td>
                                    <td>{user.city}</td>    
                                    <td>{user.dept}</td>
                                    <td>
                                        <Link to={{pathname: `/editPage/${user.id}`}}  className="btn btn-success" style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faEdit}/></Link> 
                                        <button  className="btn btn-danger" onClick={()=>this.deleteRecord(user.id)} style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                    </td>
                                </tr>
                            )
                        }
            })}
                           
                </tbody>
                </table>
                <Link to="/addUser" className="btn btn-success" style={{marginLeft: '10px'}}>Add User</Link>
            </div>
        )
    }
}


// const listItems = this.props.MyState.items.map((item, index) =>
//   <li key={item.name} onClick={() => this.props.deleteItem(index)} >{item.name}</li>
// );
// {this.props.users && this.props.employees.map((user, index) =>
//     <button onClick={() => this.editDetails(user)}>EDIT</button> 
//     <button onClick={() => this.deleteEmployee(user.id)}>DELETE</button>

function mapState(state) {
    const { authentication } = state;
     const { users } = state;
    return { users };
}


const actionCreators = {
    getAll: userActions.getAll,
    deleteRecord: userActions.delete,
     getById: userActions.getById
    // editRecord: userActions.updateProfile
}

const connectedUser = connect(mapState, actionCreators)(User);
export { connectedUser as User };
