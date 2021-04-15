import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { blockInvalidChar } from "../../BlockCharacter";
import { userActions } from '../../../_actions';

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        let location = this.props.location;
        let splitArr= location.pathname.split('/');
        this.state = {
            
            userId:splitArr[2],
            user: {
                firstName: '',
                lastName: '',
                email: '',
                mobile:null,
                country:'',
                state:'',
                city:'',
                pin:'',
                dept:'',
                addr1:'',
                addr2:'',
                role:''
            },
            submitted: false,
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.users && nextProps.users.user){

            this.setState({user:nextProps.users.user});
        }
    }

    
    componentDidMount() {
        this.props.getById(this.state.userId);
    }


    
    handleChange(event) {
        const { name, value } = event.target;
         const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    validate(){
        let input = this.state.user;
        let errors = {};
        let isValid = true;
    
        if (typeof input["email"] !== "undefined") {
            
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
          }
        }
        if (typeof input["mobile"] !== "undefined") {

            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(input["mobile"])) {
              isValid = false;
              errors["mobile"] = "Please enter only number.";
            }else if(typeof input["mobile"] != 'number' && input["mobile"].length != 10){
              isValid = false;
              errors["mobile"] = "Please enter valid phone number.";
            }else if(typeof input["mobile"] == 'number' && input["mobile"].toString().length != 10){
                isValid = false;
                errors["mobile"] = "Please enter valid phone number.";
            }
          
          }
       
    
        this.setState({
          errors: errors
        });
    
        return isValid;
    }
    
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.email && this.validate()) {
            this.props.updateProfile(user);
        }
    }

    render() {
        // if(this.props.users && this.props.users.user)
        //   this.state.user = this.props.users.user;

        const margin = {margin:'auto'};
        const { user, submitted } = this.state;
        let loggedUser = JSON.parse(localStorage.getItem('user'));

        return (

            <div className="container">
            <div className="col-md-12 col-md-offset-3" style={margin}><br/>
                <center><h2>User Profile</h2></center>
                <form name="form" onSubmit={this.handleSubmit} noValidate>
                    <div className="row">
                        <div className={'col-md-4 form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} required />
                            {submitted && !user.firstName &&
                                <div className="text-danger">First Name is required</div>
                            }
                        </div>
                        <div className={'col-md-4 form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} required />
                            {submitted && !user.lastName &&
                                <div className="text-danger">Last Name is required</div>
                            }
                        </div>
                        <div className={'col-md-4 form-group' + (submitted && !user.email ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} required />
                            {submitted && !user.email &&
                                <div className="text-danger">Email is required</div>
                                
                            }
                           <div className="text-danger">{this.state.errors.email}</div>

                        </div>
                    </div>
                    <div className="row">
                       
                        <div className={'col-md-4 form-group' + (submitted && !user.mobile ? ' has-error' : '')}>
                            <label htmlFor="mobileNo">Mobile</label>
                            <input type="number" className="form-control" name="mobile" value={user.mobile} onChange={this.handleChange} onKeyDown={blockInvalidChar} required />
                            {submitted && !user.mobile &&
                                <div className="text-danger">Mobile no is required</div>
                            }
                         <div className="text-danger">{this.state.errors.mobile}</div>

                        </div>
                        <div className={'col-md-4 form-group' + (submitted && !user.dept ? ' has-error' : '')}>
                            <label htmlFor="dept">Department</label>
                            <select className="form-control" name="dept" value={user.dept} onChange={this.handleChange} >
                                <option value="">Choose Department</option>
                                <option value="IT">IT</option>
                                <option value="Finance">Finance</option>
                            </select>
                            {submitted && !user.dept &&
                                <div className="text-danger">Department is required</div>
                            }
                        </div>
                        <div className={'col-md-4 form-group' + (submitted && !user.addr1 ? ' has-error' : '')}>
                            <label htmlFor="addr1">Address Line1</label>
                            <input type="text" className="form-control" name="addr1" value={user.addr1} onChange={this.handleChange} required />
                            {submitted && !user.addr1 &&
                                <div className="text-danger">Address Line1 is required</div>
                            }
                        </div>
                    </div>
                    
                    <div className="row">
                       
                        <div className={'col-md-4 form-group' + (submitted && !user.addr2 ? ' has-error' : '')}>
                            <label htmlFor="addr2">Address Line2</label>
                            <input type="text" className="form-control" name="addr2" value={user.addr2} onChange={this.handleChange} />
                            {submitted && !user.addr2 &&
                                <div className="text-danger">Address Line2 is required</div>
                            }
                        </div>
                        <div className={'col-md-4 form-group' + (submitted && !user.country ? ' has-error' : '')}>
                            <label htmlFor="country">Country</label>
                            <select className="form-control" name="country" value={user.country} onChange={this.handleChange}>
                                <option value="">Choose Country</option>
                                <option value="India">India</option>
                                <option value="US">US</option>
                            </select>                         {submitted && !user.country &&
                                <div className="text-danger">Country is required</div>
                            }
                        </div>
                        <div className={'col-md-4 form-group' + (submitted && !user.state ? ' has-error' : '')}>
                            <label htmlFor="state">State</label>
                            <select  className="form-control" name="state" value={user.state} onChange={this.handleChange}>
                                <option value="">Choose State</option>
                                <option value="Maharastra">Maharastra</option>
                                <option value="Goa">Goa</option>
                            </select>                         {submitted && !user.state &&
                                <div className="text-danger">State is required</div>
                            }
                        </div>
                    </div>
                    <div className="row">
                        
                       
                        <div className={'col-md-4 form-group' + (submitted && !user.city ? ' has-error' : '')}>
                            <label htmlFor="city">City</label>
                            <select className="form-control" name="city" value={user.city} onChange={this.handleChange}>
                                <option value="">Choose City</option>
                                <option value="Pune">Pune</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>                         {submitted && !user.city &&
                                <div className="text-danger">City is required</div>
                            }
                        </div>
                        <div className={'col-md-4 form-group' + (submitted && !user.pin ? ' has-error' : '')}>
                            <label htmlFor="pin">Pin code</label>
                            <input type="text" className="form-control" name="pin" value={user.pin} onChange={this.handleChange} required />
                            {submitted && !user.pin &&
                                <div className="text-danger">Pin Code is required</div>
                            }
                        </div>
                        {(loggedUser.role=='admin') && 
                        <div className={'col-md-4 form-group' + (submitted && !user.role ? ' has-error' : '')}>
                                <label htmlFor="country">Role</label>
                                <select className="form-control" name="role" value={user.role} onChange={this.handleChange}>
                                    <option value="">Choose User Role</option>
                                    <option value="normal">Normal Role</option>
                                    <option value="admin">Admin Role</option>
                                </select>                         
                            {submitted && !user.role &&
                                <div className="text-danger">Role is required</div>
                            }
                        </div>
                        }
                       
                        {(loggedUser.role=='normal') &&
                            <div className="col-md-4 form-group">  
                                <label htmlFor="country">Role</label>  
                                <input type="text" disabled className="form-control" name="role" value={user.role.toUpperCase()} />
                            </div>
                        }
                        
                    </div>
                   
                    <div className="form-group">
                        <button className="btn btn-primary">Update</button>&nbsp;&nbsp;
                        <Link to="/" className="btn btn-success">Cancel</Link>
                        {/* {registering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        } */}
                        {/* <Link to="/login" className="btn btn-link">Cancel</Link> */}
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users } = state;
    return { users };
}

const actionCreators = {
  //  getUsers: userActions.getAll,
  updateProfile: userActions.updateProfile,
  getById: userActions.getById
}

const connectedEditPage = connect(mapState, actionCreators)(EditPage);
export { connectedEditPage as EditPage };