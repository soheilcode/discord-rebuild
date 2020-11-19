import { createSlice } from '@reduxjs/toolkit';

export const channelSlice = createSlice({
    name: 'channel',
    initialState: {

        channelId: null,
        channelName: null
    },
    reducers: {
        setChannelId: (state, action) => {
            state.channelId = action.payload.channelId
            state.channelName = action.payload.channelName

        }
    },
});

export const { setChannelId } = channelSlice.actions;


export const selectChannelId = state => state.channel.channelId
export const selectChannelName = state => state.channel.channelName

export default channelSlice.reducer;