import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
    id: string;
    name: string;
    email: string;
    username: string;
    password: string; // encrypted
    accessToken: string;
    refreshToken: string;
    role: string;
}

interface UserInfoState {
    userInfo: UserInfo | null;
}

const initialState: UserInfoState = {
    userInfo: null,
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserInfo>) {
            state.userInfo = action.payload;
        },
        logout(state) {
            state.userInfo = null;
        },
        updateTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
            if (state.userInfo) {
                state.userInfo.accessToken = action.payload.accessToken;
                state.userInfo.refreshToken = action.payload.refreshToken;
            }
        },
    },
});

export const { login, logout, updateTokens } = userInfoSlice.actions;

export const selectUserInfo = (state: { userInfo: UserInfoState }) => state.userInfo.userInfo;

export default userInfoSlice.reducer;