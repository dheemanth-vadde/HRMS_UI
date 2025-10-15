import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleAccessState {
    permissions: string[];
}

const initialState: RoleAccessState = {
    permissions: [],
};

const roleAccessSlice = createSlice({
    name: 'roleAccess',
    initialState,
    reducers: {
        setPermissions(state, action: PayloadAction<string[]>) {
            state.permissions = action.payload;
        },
        addPermission(state, action: PayloadAction<string>) {
            if (!state.permissions.includes(action.payload)) {
                state.permissions.push(action.payload);
            }
        },
        removePermission(state, action: PayloadAction<string>) {
            state.permissions = state.permissions.filter(permission => permission !== action.payload);
        },
    },
});

export const { setPermissions, addPermission, removePermission } = roleAccessSlice.actions;

export const selectPermissions = (state: { roleAccess: RoleAccessState }) => state.roleAccess.permissions;

export default roleAccessSlice.reducer;