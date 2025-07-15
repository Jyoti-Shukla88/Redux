
import {ADD_TO_CART, REMOVE_FROM_CART} from './constants';

export interface ProductItem {
  name: string;
  price: number;
  color: string;
  image: string;
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: ProductItem;
}
interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: string; // using product name for removal
}

type CartAction = AddToCartAction | RemoveFromCartAction;

const initialState: ProductItem[] =[];

export const reducer=( state: ProductItem[] = initialState, action: CartAction): ProductItem[] => {
switch(action.type){
    case ADD_TO_CART:
        return[
            ...state,
            action.payload
        ];
    case REMOVE_FROM_CART:
        let result=state.filter(item =>{
            return item.name!==action.payload
        })
                 
        return [
            ...result
            ]
        

        
    default:
        return state ;   
}
};
