import {ADD_TO_CART,REMOVE_FROM_CART} from './constants'

interface ProductItem {
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
  payload: string; // itemName is a string
}


export const addToCart = (item: ProductItem): AddToCartAction => ({
        type:ADD_TO_CART,
        payload:item
    });
export const removeFromCart = (itemName: string): RemoveFromCartAction => ({
        type: REMOVE_FROM_CART,
        payload: itemName,
    });