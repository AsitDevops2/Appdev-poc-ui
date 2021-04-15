import { categoryConstants } from '../_constants';

export function categories(state = {}, action) {
  switch (action.type) {
    case categoryConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case categoryConstants.GETALL_SUCCESS:
      // console.log(action.category);
      return {        
        items: action.categories
      };
    case categoryConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}