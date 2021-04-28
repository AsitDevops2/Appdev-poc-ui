import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const categoryActions = {
    addCategory,
    getAllCategory,
    getCategoryByUser,
    deleteCategory
};



function addCategory(category) {
    return dispatch => {
        dispatch(request(category));

        categoryService.addCategory(category)
            .then(
                category => { 
                    dispatch(success(category));
                    history.push('/category');
                    dispatch(alertActions.success('Category added successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
            // console.log(product);
    };
    function request(category) { return { type: categoryConstants.ADDCATEGORY_REQUEST, category } }
    function success(category) { return { type: categoryConstants.ADDCATEGORY_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.ADDCATEGORY_FAILURE, error } }
}


function getAllCategory() {
    return dispatch => {
        dispatch(request());

        categoryService.getAllCategory()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error.toString()))
            );
    };
    
    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

function getCategoryByUser(id) {
    return dispatch => {
        dispatch(request(id));

        categoryService.getCategoryByUser(id)
            .then(
                categories => dispatch(success(categories.result)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

function deleteCategory(id) {
    return dispatch => {
        dispatch(request(id));

        categoryService.deleteCategory(id)
            .then(
                category => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: categoryConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: categoryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: categoryConstants.DELETE_FAILURE, id, error } }
}

