import { createSlice } from '@reduxjs/toolkit';
import { sum, map, filter, uniqBy } from 'lodash';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
import {
  CartItem,
  Product,
  ProductFilter,
  ProductFormikProps,
  ProductState
} from '../../@types/products';

import { handleAddEditProduct } from 'utils/financeAxios/financeReport';

// ----------------------------------------------------------------------

const initialState: ProductState = {
  isLoading: false,
  error: false,
  products: [],
  product: null,
  sortBy: null,
  filters: {
    city: [],
    category: '',
    priceRange: ''
  },
  checkout: {
    orderId: '',
    paymentType: '',
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    shipping: 0,
    billing: null
  }
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    // EDIT PRODUCT
    editProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.city = action.payload.city;
      state.filters.category = action.payload.category;
      state.filters.priceRange = action.payload.priceRange;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map((cartItem: CartItem) => cartItem.price * cartItem.quantity));
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = filter(state.checkout.cart, (item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.orderId = '';
      state.checkout.paymentType = '';
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    resetShipment(state, action) {
      const cartID = action.payload;
      state.checkout.cart[cartID].shipment = null;
      state.checkout.cart[cartID].shipment_price = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyShipping(state, action) {
      const { chosenItem, shipment, shipment_price } = action.payload;
      state.checkout.cart[chosenItem].shipment = shipment;
      state.checkout.cart[chosenItem].shipment_price = shipment_price;
      const totalShipping = state.checkout.cart.reduce((a, b) => a + (b.shipment_price || 0), 0);
      console.log(totalShipping);
      state.checkout.shipping = totalShipping;
      state.checkout.total = state.checkout.subtotal + totalShipping;
    },

    addProductSuccess(state) {
      state.isLoading = false;
    },

    setCheckoutOrder(state, action) {
      state.checkout.orderId = action.payload;
    },

    setPaymentType(state, action) {
      state.checkout.paymentType = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  resetShipment,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  increaseQuantity,
  decreaseQuantity,
  sortByProducts,
  filterProducts,
  setCheckoutOrder,
  setPaymentType
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts(filter: ProductFilter, name: string | null, sortBy: string | null) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    dispatch(slice.actions.filterProducts(filter));
    console.log(sortBy);
    try {
      const response: { data: { payload: Product[] } } = await axios.get('/products/', {
        params: {
          name,
          sortBy,
          category: filter.category === '' ? undefined : filter.category,
          city: filter.city === [] ? undefined : filter.city[0],
          price: filter.priceRange === '' ? undefined : filter.priceRange
        }
      });
      dispatch(slice.actions.getProductsSuccess(response.data.payload));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProductsBySeller(id: String) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response: { data: { payload: Product[] } } = await axios.get('/products/seller/' + id);
      dispatch(slice.actions.getProductsSuccess(response.data.payload));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(name: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response: { data: { payload: Product } } = await axios.get('/products/' + name);
      dispatch(slice.actions.getProductSuccess(response.data.payload));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function addProduct(product: ProductFormikProps) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      // Upload product to product table
      console.log(product);
      const periode = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`;
      const response = await axios.post('/products/create', product);
      await handleAddEditProduct(
        periode,
        0,
        Number(product.available),
        0,
        Number(product.productionCost)
      );
      console.log(response.data.payload);
      dispatch(slice.actions.addProductSuccess());
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function editProduct(
  product: ProductFormikProps,
  id: string,
  prevProductionCost: number,
  prevAvailable: number
) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const periode = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`;
      await axios.patch(`/products/${id}`, product);
      await handleAddEditProduct(
        periode,
        prevAvailable,
        Number(product.available),
        prevProductionCost,
        Number(product.productionCost)
      );
      dispatch(slice.actions.addProductSuccess());
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
