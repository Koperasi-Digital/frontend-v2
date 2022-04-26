import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import courseReducer from './slices/course';
import forumReducer from './slices/forum';
import userReducer from './slices/user';
import roleReducer from './slices/role';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import notificationReducer from './slices/notification';
import orderReducer from './slices/order';

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
  course: courseReducer,
  forum: forumReducer,
  user: userReducer,
  role: roleReducer,
  calendar: calendarReducer,
  notification: notificationReducer,
  order: orderReducer,
  product: persistReducer(productPersistConfig, productReducer)
});

export { rootPersistConfig, rootReducer };
