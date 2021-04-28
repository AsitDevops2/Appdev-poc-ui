import config from 'config';
import { authHeader } from '../_helpers';

export const categoryService = {
    addCategory,
    getAllCategory,
    getCategoryByUser,
    deleteCategory
};

function getCategoryByUser(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user/getCategory/${id}`, requestOptions).then(handleResponse);
}

function getAllCategory() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.invUrl}/product/category/findAll`, requestOptions).then(handleResponse);
}

function addCategory(category) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    };
    return fetch(`${config.invUrl}/product/category/addCategory`, requestOptions).then(handleResponse);
}

function deleteCategory(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.invUrl}/product/category/deleteCategory/${id}`,requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        //console.log(data);
        //if (!response.ok) {
            if (data.status === 401 || data.status === 400 || !response.ok) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        //}
           console.log(data);
        return data;
    });
}


