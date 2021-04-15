import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { blockInvalidChar } from "../../BlockCharacter";
import { userActions } from '../../../_actions';

let products = [{id:"1",name:"Android Tv",brand:"Sony",description:"Sony tv with smart features",quantity:"100",price:"120000",category:"Electronics",supplier:"Shradha"},
                {id:"2",name:"Smart TV",brand:"Redmi",description:"Redmi tv with smart features",quantity:"200",price:"80000",category:"Electronics",supplier:"Shradha"},
                {id:"3",name:"Washing Machine",brand:"Whirpool",description:"None",quantity:"100",price:"35000",category:"Electronics",supplier:"Neeta"}];


class UpdateProduct extends React.Component {
    constructor(props) {
        super(props);
        let location = this.props.location;
        let splitArr= location.pathname.split('/');
        this.state = {
            
            id:splitArr[2],
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

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.products && nextProps.products.product){

            this.setState({product:nextProps.products.product});
        }
    }

    
    componentDidMount() {
        // this.props. get by id api
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
        if (product.name && product.supplier && this.validate()) {
            console.log(product);   
            //this..props.get update api
        }   
    }

    render() {
        const margin = {margin:'auto'};
        const alignment ={marginLeft:'10%'};
        const { product, submitted } = this.state;
        
        return (
            <div className="container" style={margin}>
                <br/>
                <div style={alignment}><h2>Add Product</h2></div><br/>
                <form name="form" onSubmit={this.handleSubmit} noValidate>
                    <div className="row" style={alignment}>
                        <div className={'col-md-5 form-group' + (submitted && ! product.name ? ' has-error' : '')}>
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" name="name" value={product.name} onChange={this.handleChange} required />
                            {submitted && !product.name &&
                                <div className="text-danger">Name is required</div>
                            }
                        </div>
                        <div className={'col-md-5 form-group' + (submitted && !product.brand ? ' has-error' : '')}>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" className="form-control" name="brand" value={product.brand} onChange={this.handleChange} required />
                            {submitted && !product.brand &&
                                <div className="text-danger">Brand is required</div>
                            }
                        </div>
                    
                    </div>
                    <div className="row" style={alignment}>
                       
                        <div className={'col-md-5 form-group' + (submitted && !product.description ? ' has-error' : '')}>
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" name="description" value={product.description} onChange={this.handleChange} required />
                            {submitted && !product.description &&
                                <div className="text-danger">Product Description is required</div>
                            }

                        </div>
                        <div className={'col-md-5 form-group' + (submitted && !product.quantity ? ' has-error' : '')}>
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" className="form-control" name="quantity" value={product.quantity} onChange={this.handleChange} onKeyDown={blockInvalidChar} min="1" required />
                            {submitted && !product.quantity &&
                                <div className="text-danger">Quantity is required</div>
                            }
                         <div className="text-danger">{this.state.errors.quantity}</div>
                        </div>
                      
                    </div>
                    
                    <div className="row" style={alignment}>
                       
                        <div className={'col-md-5 form-group' + (submitted && !product.price ? ' has-error' : '')}>
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" name="price" value={product.price} onChange={this.handleChange} onKeyDown={blockInvalidChar} min="1" required />
                            {submitted && !product.price &&
                                <div className="text-danger">Price is required</div>
                            }
                            <div className="text-danger">{this.state.errors.price}</div>
                        </div>
                        <div className={'col-md-5 form-group' + (submitted && !product.category ? ' has-error' : '')}>
                            <label htmlFor="category">Category</label>
                            <select className="form-control" name="category" value={product.category} onChange={this.handleChange}>
                                <option value="">Choose Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Appliances">Appliances</option>
                            </select>                 
                            {submitted && !product.category &&
                                <div className="text-danger">Category is required</div>
                            }
                            <a href="#" style={{float:'right'}}>Add Catogery</a>
                        </div>
                    </div>
                    <div className="row" style={alignment}>
                        <div className={'col-md-5 form-group' + (submitted && !product.supplier ? ' has-error' : '')}>
                            <label htmlFor="supplier">Supplier</label>
                            <input type="text" className="form-control" name="supplier" value={product.supplier} onChange={this.handleChange} required />
                            {submitted && !product.supplier &&
                                <div className="text-danger">Supplier is required</div>
                            }
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

// function mapState(state) {
//     const { products } = state;
//     return { products };
// }

// const actionCreators = {
//    getUsers: userActions.getAll,
//   updateProfile: userActions.updateProfile,
//   getById: userActions.getById
// }

// const connectedUpdateProduct = connect(mapState, actionCreators)(UpdateProduct);
export { UpdateProduct };