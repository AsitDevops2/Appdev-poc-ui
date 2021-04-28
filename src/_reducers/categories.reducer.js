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

      case categoryConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(category =>
          category.id === action.id
            ? { ...category, deleting: true }
            : category
        )
      };
    case categoryConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(category => category.id !== action.id)
      };
    case categoryConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(category => {
          if (category.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...categoryCopy } = category;
            // return copy of user with 'deleteError:[error]' property
            return { ...categoryCopy, deleteError: action.error };
          }

          return category;
        })
      };
    default:
      return state
  }
}