import { createSlice } from '@reduxjs/toolkit';

export const serverSlice = createSlice({
    name: 'server',
    initialState: {
        serverId: null,
        serverName: null
    },
    reducers: {
        setServerId: (state, action) => {
            state.serverId = action.payload.serverId
            state.serverName = action.payload.serverName

        }
    },
});

export const { setServerId } = serverSlice.actions;


export const selectServerId = state => state.server.serverId
export const selectServerName = state => state.server.serverName

export default serverSlice.reducer;