import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
    id: string;
    name: string;
    email: string;
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
    },
});

export const { login, logout } = userInfoSlice.actions;

export const selectUserInfo = (state: { userInfo: UserInfoState }) => state.userInfo.userInfo;

export default userInfoSlice.reducer;