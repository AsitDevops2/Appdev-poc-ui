import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoryActions } from '../../../_actions';

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                name:'',
                description:''
                
            },
            submitted: false,
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { category } = this.state;
        this.setState({
            category: {
                ...category,
                [name]: value
            }
        });
    }

    validate(){
        let input = this.state.category;
        let errors = {};
        let isValid = true; 
        
        if (typeof input["name"] !== "undefined") {            
            var pattern = new RegExp(/^[a-zA-Z]+$/);
            if (!pattern.test(input["name"]) && !input["name"].length < 3) {
              isValid = false;
              errors["name"] = "Please enter valid name.";
            }
        }

        if (typeof input["description"] !== "undefined") {            
            var pattern = new RegExp(/^[a-zA-Z]+$/);
            if (!pattern.test(input["description"]) && !input["description"].length < 3) {
              isValid = false;
              errors["description"] = "Please enter valid description.";
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
        const { category } = this.state;
        if (category.name && category.description && this.validate()) {
            this.props.add(category);    
        }      
    }
    

    render() {
        const margin = {margin:'auto'};
        // const alignment ={marginLeft:'10%'};
        const { category, submitted } = this.state;
        
        return (
            <div className="container" style={margin}>
                <br/>
                <div><h2>Add Category</h2></div><br/>
                <form name="form" onSubmit={this.handleSubmit} noValidate>
                    <div className="row">
                        <div className={'col-md-6 form-group' + (submitted && ! ! category.name ? ' has-error' : '' )}>
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} required />
                            {submitted && !category.name &&
                                <div className="text-danger">Name is required</div>
                            }
                            <div className="text-danger">{this.state.errors.name}</div>
                        </div>
                        <div className={'col-md-6 form-group' + (submitted && !category.description ? ' has-error' : '' )}>
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" name="description" onChange={this.handleChange} required />
                            {submitted && !category.description &&
                                <div className="text-danger">Description is required</div>
                            }
                            <div className="text-danger">{this.state.errors.description}</div>
                        </div>
                    
                    </div>
                   
                        {/* <div style={{marginTop: "10%"}}></div> */}<br/>
                        <button className="btn btn-success">Save</button>&nbsp;&nbsp;
                        <Link to="/category" className="btn btn-danger">Cancel</Link>
                                            
                   
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
    add: categoryActions.addCategory
}

const connectedAddCategory = connect(mapState, actionCreators)(AddCategory);
export { connectedAddCategory as AddCategory };

