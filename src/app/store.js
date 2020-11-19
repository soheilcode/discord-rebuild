import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import channelReducer from '../features/channelSlice'
import serverReducer from '../features/serverSlice'
export default configureStore({
    reducer: {
        user: userReducer,
        channel: channelReducer,
        server: serverReducer
    },
});