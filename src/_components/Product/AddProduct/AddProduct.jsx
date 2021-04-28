import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { blockInvalidChar } from "../../BlockCharacter";
import { categoryActions, productActions } from '../../../_actions';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                name:'',
                brand:'',
                description:'',
                quantity:'',
                price:'',
                category:'',
                supplier:''
            },
            submitted: false,
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        let loggedUser = JSON.parse(localStorage.getItem('user'));
        this.props.getCategory(loggedUser.id);
        // console.log(this.props.getAll());
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { product } = this.state;
        this.setState({
            product: {
                ...product,
                [name]: value
            }
        });
    }
    validate(){
        let input = this.state.product;
        let errors = {};
        let isValid = true;   

        if (typeof input["supplier"] !== "undefined") {            
            var pattern = new RegExp(/^[a-zA-Z]+$/);
            if (!pattern.test(input["supplier"])) {
              isValid = false;
              errors["supplier"] = "Please enter valid supplier.";
            }
        }
        if (typeof input["description"] !== "undefined") {            
            var pattern = new RegExp(/^[a-zA-Z]+$/);
            if (!pattern.test(input["description"])) {
              isValid = false;
              errors["description"] = "Please enter valid description.";
            }
        }
        if (typeof input["brand"] !== "undefined") {            
            var pattern = new RegExp(/^[a-zA-Z]+$/);
            if (!pattern.test(input["brand"])) {
              isValid = false;
              errors["brand"] = "Please enter valid brand.";
            }
        }
        
        if ( typeof input["quantity"] !== "undefined") {
            if(this.state.product.quantity==0){
            isValid = false;
            errors["quantity"] = "Please enter valid quantity.";
            }
          }

        if ( typeof input["price"] !== "undefined") {
        if(this.state.product.price==0){
        isValid = false;
        errors["price"] = "Please enter valid price.";
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
        const { product } = this.state;
        if (product.name && product.supplier && product.description && product.category && this.validate()) {
            this.props.add(product);
            // console.log(product);   
        }      
    }
    

    render() {
        const margin = {margin:'auto'};
        const alignment ={marginLeft:'10%'};
        const { registering  } = this.props;
        const { product, submitted } = this.state;
        let categories={items:[]};
        if(this.props.categories != null && this.props.categories.items != null){
            categories = this.props.categories;
        } 
        let optionItems = categories.items.map((category,index) =>
        <option value={category.name}>{category.name}</option>
        );
        
        return (
            <div className="container" style={margin}>
                <br/>
                <div style={alignment}><h2>Add Product</h2></div><br/>
                <form name="form" onSubmit={this.handleSubmit} noValidate>
                    <div className="row" style={alignment}>
                        <div className={'col-md-5 form-group' + (submitted && ! product.name ? ' has-error' : '')}>
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} required />
                            {submitted && !product.name &&
                                <div className="text-danger">Name is required</div>
                            }
                            {/* <div className="text-danger">{this.state.errors.name}</div> */}
                        </div>
                        <div className={'col-md-5 form-group' + (submitted && !product.brand ? ' has-error' : '')}>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" className="form-control" name="brand" onChange={this.handleChange} required />
                            {submitted && !product.brand &&
                                <div className="text-danger">Brand is required</div>
                            }
                            <div className="text-danger">{this.state.errors.brand}</div>   
                        </div>                 
                    </div>
                    <div className="row" style={alignment}>
                       
                        <div className={'col-md-5 form-group' + (submitted && !product.description ? ' has-error' : '')}>
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" name="description" onChange={this.handleChange} required />
                            {submitted && !product.description &&
                                <div className="text-danger">Product Description is required</div>
                            }
                            <div className="text-danger">{this.state.errors.description}</div>

                        </div>
                        <div className={'col-md-5 form-group' + (submitted && !product.quantity ? ' has-error' : '')}>
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" className="form-control" name="quantity" onChange={this.handleChange} onKeyDown={blockInvalidChar} min="1" required />
                            {submitted && !product.quantity &&
                                <div className="text-danger">Quantity is required</div>
                            }
                         <div className="text-danger">{this.state.errors.quantity}</div>
                        </div>
                      
                    </div>
                    
                    <div className="row" style={alignment}>
                       
                        <div className={'col-md-5 form-group' + (submitted && !product.price ? ' has-error' : '')}>
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" name="price" onChange={this.handleChange} onKeyDown={blockInvalidChar} min="1" required />
                            {submitted && !product.price &&
                                <div className="text-danger">Price is required</div>
                            }
                            <div className="text-danger">{this.state.errors.price}</div>
                        </div>
                        <div className={'col-md-5 form-group' + (submitted && !product.category ? ' has-error' : '')}>
                            <label htmlFor="category">Category</label>
                            {<select className="form-control" name="category" value={product.category} onChange={this.handleChange}>
                                <option value="">Choose Category</option>
                                {optionItems}
                            </select>}
                            {submitted && !product.category &&
                                <div className="text-danger">Category is required</div>
                            }
                            <a href="/addCategory" style={{float:'right'}}>Add Catogery</a>
                        </div>
                    </div>
                    <div className="row" style={alignment}>
                        <div className={'col-md-5 form-group' + (submitted && !product.supplier ? ' has-error' : '')}>
                            <label htmlFor="supplier">Supplier</label>
                            <input type="text" className="form-control" name="supplier" onChange={this.handleChange} required />
                            {submitted && !product.supplier &&
                                <div className="text-danger">Supplier is required</div>
                            }
                            <div className="text-danger">{this.state.errors.supplier}</div>
                        </div>
                        
                        <div className="col-md-5 form-group">
                        <div style={{marginTop: "10%"}}></div>
                        <button className="btn btn-success">Save</button>&nbsp;&nbsp;
                        <Link to="/productList" className="btn btn-danger">Cancel</Link>
                        </div>                       
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    const { categories } = state;
    return { categories };
//    return { registering };
}

const actionCreators = {
    add: productActions.addProduct,
    //getCategory: categoryActions.getAllCategory
    getCategory:categoryActions.getCategoryByUser
}

const connectedAddProduct = connect(mapState, actionCreators)(AddProduct);
export { connectedAddProduct as AddProduct };
