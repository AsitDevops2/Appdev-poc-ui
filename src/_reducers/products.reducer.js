import { productConstants } from '../_constants';

export function products(state = {}, action) {
  switch (action.type) {
    case productConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case productConstants.GETALL_SUCCESS:
      // console.log(action.product);
      return {        
        items: action.products
      };
    case productConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case productConstants.DELETE_REQUEST:
      // add 'deleting:true' property to product being deleted
      return {
        ...state,
        items: state.items.map(product =>
          product.id === action.id
            ? { ...product, deleting: true }
            : product
        )
      };
    case productConstants.DELETE_SUCCESS:
      // remove deleted product from state
      return {
        items: state.items.filter(product => product.id !== action.id)
      };
    case productConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to product 
      return {
        ...state,
        items: state.items.map(product => {
          if (product.id === action.id) {
            // make copy of product without 'deleting:true' property
            const { deleting, ...productCopy } = product;
            // return copy of product with 'deleteError:[error]' property
            return { ...productCopy, deleteError: action.error };
          }

          return product;
        })
      };
      case productConstants.GETBYID_SUCCESS:
      // remove deleted product from state
      return {
        product:action.product
      };
      
    default:
      return state
  }
}