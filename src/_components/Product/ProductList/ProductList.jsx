import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { faEdit,faTrashAlt,faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "react-js-pagination";
import { productActions } from '../../../_actions';
// import "bootstrap-less";



class ProductList extends React.Component {
    
    
    constructor(props) {
        
        super(props);
        this.state= {
            activePage:1,
            total:0,
            data: [],
            serachTxt:"" ,
            filterData:[]     
        };
        this.deleteRecord = this.deleteRecord.bind(this);
        this.filterData = this.filterData.bind(this);
    }   
   
    componentDidMount() {
        this.props.getAll();
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.products && nextProps.products.items && nextProps.products.items !== this.state.data) {
          let len = nextProps.products.items.length;
         let  arr=JSON.parse(JSON.stringify(nextProps.products.items)); 
            this.setState({ data: arr.slice(0,5),total:len});
        }
      }

    handlePageChange(pageNumber) { 
        console.log(`active page is ${pageNumber}`);
        let len = this.state.filterData.length;
        let  arr= len ? JSON.parse(JSON.stringify(this.state.filterData)):JSON.parse(JSON.stringify(this.props.products.items)); 

         if(pageNumber > 1){
            let start=  (pageNumber-1)*5;
            let end= start+5;
            let data = arr.filter((row,index)=>{
                return index >= start && index < end;
            })
            this.setState({activePage: pageNumber,data:data});
            }else{           
            this.setState({activePage: pageNumber,data: arr.slice(0, 5)});
         }       
          
    }

    filterData(e) {
        let text = e.target.value.toLowerCase();
        let arr = JSON.parse(JSON.stringify(this.props.products.items));
        if (text.length>=1) {
            // let data = arr.filter(obj => Object.values(obj).some(val =>{
            //     console.log(val);
            //    return val.toString().toLowerCase().includes(text.toLowerCase());
            //}));
             let data = arr.filter(obj =>{
               return obj.name.toLowerCase().includes(text) || obj.brand.toLowerCase().includes(text) || obj.category.toLowerCase().includes(text) ||
                obj.price.toString().includes(text) || obj.quantity.toString().includes(text) ;
            });
            let flitArr=JSON.parse(JSON.stringify(data));
            flitArr=flitArr.slice(0,5);

            this.setState({data:flitArr,activePage:1,total:data.length,filterData:data});
        }
        else {
            this.setState({ data: arr.slice(0, 5), activePage: 1,filterData:[] });
        }

    }

    deleteRecord(id) {
        if( confirm('Sure want to delete?')&&id != null)
        this.props.deleteRecord(id); 
        window.location.reload ();   
    }

    render() {
        // let products={items:[]};
        // if(this.props.products != null && this.props.products.items != null){
        //     products = this.props.products;
        // }

        

        return (
            <div className="container">
               <h2>Product List</h2><br/>
                <div className="row">
                <div classname="col-md-8 form-group" style={{width:'35%',marginLeft:'15px'}}>
                <input type="text" name="searchValue" placeholder="Search" className="form-control" 
                onKeyUp={this.filterData}></input><br/>
                </div>
                <div classname="col-md-4 form-group" style={{marginLeft:'auto',marginRight:'15px'}}>
                <Link to="/addProduct" className="btn btn-primary">Add Product</Link>
                </div>                
                </div>
                <table className="table table-bordered">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>                
                <tbody>
                    {this.state.data.map((product, index) => {
                        
                        return(
                            <tr key={index+1}>
                                <td>{index+1}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>    
                                <td>{product.category}</td>
                                
                                <td>
                                <Link to={{pathname: `/editProduct/${product._id}`}} className="btn btn-success" style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faEdit}/></Link> 
                                <button  className="btn btn-danger" onClick={()=>this.deleteRecord(product._id)} style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                
                                </td>
                            </tr>
                            
                        )
                         
                        
            })}

                </tbody>
                </table>

                <Pagination

                activePage={this.state.activePage}

                itemsCountPerPage={5}
                
                totalItemsCount={this.state.total}

                pageRangeDisplayed={5}

                itemClass="page-item"
                
                linkClass="page-link"

                onChange={this.handlePageChange.bind(this)}/>

                </div>
        )
    }
}

function mapState(state) {
    const { authentication } = state;
     const { products } = state;
    return { products };
}


const actionCreators = {
    getAll: productActions.getAll,
    deleteRecord: productActions.delete
}

const connectedProductList = connect(mapState, actionCreators)(ProductList);
export { connectedProductList as ProductList };
// export {ProductList}
