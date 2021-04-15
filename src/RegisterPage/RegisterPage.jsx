import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { blockInvalidChar } from "../_components/BlockCharacter";
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                mobile:'',
                password: '',
                country:'',
                state:'',
                city:'',
                pin:'',
                dept:'',
                addr1:'',
                addr2:''
            },
            submitted: false,
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    
        if (typeof input["password"] !== 'undefined') {
          var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
          if (!strongRegex.test(input["password"])) {
            isValid = false;
            errors["password"] = "Password length is 8-15. Password starts with a uppercase letter.Password should have one special character like $.#, @.% & Password should have one number";
        }
        }
    
        
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
            }else if(input["mobile"].length != 10){
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
        if (user.firstName && user.lastName && user.email && user.password && user.pin && this.validate()) {
            this.props.register(user);
        }
        
    }

    render() {
        const margin = {margin:'auto'};
        let dropdown ={width:"250px"}
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-8 col-md-offset-3" style={margin}>
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit} noValidate>
                    <div className="row">
                        <div className={'col-md-3 form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} required />
                            {submitted && !user.firstName &&
                                <div className="text-danger">First Name is required</div>
                            }
                        </div>
                        <div className={'col-md-3 form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} required />
                            {submitted && !user.lastName &&
                                <div className="text-danger">Last Name is required</div>
                            }
                        </div>
                        <div className={'col-md-3 form-group' + (submitted && !user.email ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} required />
                            {submitted && !user.email &&
                                <div className="text-danger">Email is required</div>
                                
                            }
                           <div className="text-danger">{this.state.errors.email}</div>

                        </div>
                        <div className={'col-md-3 form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} required />
                            {submitted && !user.password &&
                                <div className="text-danger">Password is required</div>
                            }
                        <div className="text-danger">{this.state.errors.password}</div>

                        </div>
                    </div>
                    <div className="row">
                      
                        <div className={'col-md-3 form-group' + (submitted && !user.mobile ? ' has-error' : '')}>
                            <label htmlFor="mobile">Mobile</label>
                            <input type="number" className="form-control" name="mobile" value={user.mobile} onChange={this.handleChange} onKeyDown={blockInvalidChar} required />
                            {submitted && !user.mobile &&
                                <div className="text-danger">Mobile no is required</div>
                            }
                         <div className="text-danger">{this.state.errors.mobile}</div>

                        </div>
                        <div className={'col-md-3 form-group' + (submitted && !user.dept ? ' has-error' : '')}>
                            <label htmlFor="dept">Department</label>
                            <select className="form-control" name="dept" value={user.dept} onChange={this.handleChange}>
                                <option value="">Choose Department</option>
                                <option value="IT">IT</option>
                                <option value="Finance">Finance</option>
                            </select>
                            {submitted && !user.dept &&
                                <div className="text-danger">Department is required</div>
                            }
                        </div>
                        <div className={'col-md-3 form-group' + (submitted && !user.addr1 ? ' has-error' : '')}>
                            <label htmlFor="addr1">Address Line1</label>
                            <input type="text" className="form-control" name="addr1" value={user.addr1} onChange={this.handleChange} required />
                            {submitted && !user.addr1 &&
                                <div className="text-danger">Address Line1 is required</div>
                            }
                        </div>
                        <div className={'col-md-3 form-group' + (submitted && !user.addr2 ? ' has-error' : '')}>
                            <label htmlFor="addr2">Address Line2</label>
                            <input type="text" className="form-control" name="addr2" value={user.addr2} onChange={this.handleChange} />
                            {submitted && !user.addr2 &&
                                <div className="text-danger">Address Line2 is required</div>
                            }
                        </div>
                    </div>
                    
                    <div className="row">
                       
                        <div className={'col-md-3 form-group' + (submitted && !user.country ? ' has-error' : '')}>
                            <label htmlFor="country">Country</label>
                            <select className="form-control" name="country" onChange={this.handleChange}>
                                <option value="">Choose Country</option>
                                <option value="India">India</option>
                                <option value="US">US</option>
                            </select>                         {submitted && !user.country &&
                                <div className="text-danger">Country is required</div>
                            }
                        </div>
                        <div className={'col-md-3 form-group' + (submitted && !user.state ? ' has-error' : '')}>
                            <label htmlFor="state">State</label>
                            <select  className="form-control" name="state" onChange={this.handleChange}>
                                <option value="">Choose State</option>
                                <option value="Maharastra">Maharastra</option>
                                <option value="Goa">Goa</option>
                            </select>                         {submitted && !user.state &&
                                <div className="text-danger">State is required</div>
                            }
                        </div>
                        <div className={'col-md-3 form-group' + (submitted && !user.city ? ' has-error' : '')}>
                            <label htmlFor="city">City</label>
                            <select className="form-control" name="city" onChange={this.handleChange} >
                                <option value="">Choose City</option>
                                <option value="Pune">Pune</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>                         {submitted && !user.city &&
                                <div className="text-danger">City is required</div>
                            }
                        </div>
                        <div className={'col-md-3 form-group' + (submitted && !user.pin ? ' has-error' : '')}>
                            <label htmlFor="pin">Pin code</label>
                            <input type="text" className="form-control" name="pin" value={user.pin} onChange={this.handleChange} required />
                            {submitted && !user.pin &&
                                <div className="text-danger">Pin Code is required</div>
                            }
                        </div>
                    </div>
                   
                   
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };