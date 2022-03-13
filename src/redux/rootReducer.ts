import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import forumReducer from './slices/forum';
import userReducer from './slices/user';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  chat: chatReducer,
  blog: blogReducer,
  forum: forumReducer,
  user: userReducer,
  calendar: calendarReducer,
  product: persistReducer(productPersistConfig, productReducer)
});

export { rootPersistConfig, rootReducer };
