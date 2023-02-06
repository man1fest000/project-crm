import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {groupsService} from "../../services";


const initialState = {
    groups: [],
    loading: false,
    error: null,
}

const getGroups = createAsyncThunk(
    "groups/getGroups",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await groupsService.getGroups();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);


const groupsSlice = createSlice({
    name: "groupsSlice",
    initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getGroups.fulfilled, (state, action) => {
                state.groups = action.payload;
                state.loading = false;
            })
            .addCase(getGroups.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getGroups.pending, (state, action) => {
                state.loading = true;
            })
});


const {reducer: groupsReducer} = groupsSlice;

const groupsActions = {
    getGroups,
}

export {groupsReducer, groupsActions};