import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            email: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email } = this.state;
        if (email ) {
            this.props.resetPassword(email);
        }
    }

    render() {
        const margin = {margin:'auto'};
        const { email, submitted } = this.state;
        return (
            <div className="col-md-4 col-md-offset-3" style={margin}>
                <h2>Reset Password</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} required/>
                        {submitted && !email &&
                            <div className="text-danger">Email is required</div>
                        }
                    </div>
                   
                    <div className="form-group">
                        <button className="btn btn-primary">Reset</button>
                        <Link to="/login" className="btn btn-link">Login</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    resetPassword: userActions.resetPassword,
    logout: userActions.logout
};

const connectedResetPasswordPage = connect(mapState, actionCreators)(ResetPasswordPage);
export { connectedResetPasswordPage as ResetPasswordPage };