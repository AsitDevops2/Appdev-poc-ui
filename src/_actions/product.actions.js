import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    addProduct,
    getAll,
    getById,
    updateProduct,
    delete: _delete
};



function addProduct(product) {
    return dispatch => {
        dispatch(request(product));

        productService.addProduct(product)
            .then(
                product => { 
                    dispatch(success(product));
                    history.push('/productList');
                    dispatch(alertActions.success('Product added successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
            // console.log(product);
    };
    function request(product) { return { type: productConstants. ADDPRODUCT_REQUEST, product } }
    function success(product) { return { type: productConstants.ADDPRODUCT_SUCCESS, product } }
    function failure(error) { return { type: productConstants.ADDPRODUCT_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        productService.getAll()
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error.toString()))
            );
    };
    
    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}


function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        productService.delete(id)
            .then(
                product => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: productConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.DELETE_FAILURE, id, error } }
}

function updateProduct(product) {
    return dispatch => {
        dispatch(request(product));
        productService.updateProduct(product)
            .then(
                product => { 
                    dispatch(success(product));
                   history.push('/productList');
                    dispatch(alertActions.success('Product updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(product) { return { type: productConstants.GETBYID_REQUEST, product } }
    function success(product) { return { type: productConstants.GETBYID_SUCCESS, product } }
    function failure(error) { return { type: productConstants.GETBYID_FAILURE, error } }
}


function getById(id) {
    return dispatch => {
        dispatch(request(id));

        productService.getById(id)
            .then(
                product => dispatch(success(product)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants. GETBYID_REQUEST } }
    function success(product) { return { type: productConstants. GETBYID_SUCCESS, product } }
    function failure(error) { return { type: productConstants. GETBYID_FAILURE, error } }
}
