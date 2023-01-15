import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let serverUrl = "http://localhost:8080"
// First, create the thunk
export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (userObj, thunkAPI) => {
        console.log("userObj from registerUser", userObj);
        //
        const obj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(userObj)
        };
        //
        let endPoint="/createActivity"
        console.log(serverUrl+endPoint)
        //
        let data = await fetch(serverUrl+endPoint, obj);
        let data2 = await data.json();
        console.log("api-response from thunk", data2);
        //
        return data2;
    }
);

//readingAllusers
export const readAllUsers = createAsyncThunk(
    "users/readUser",
    async (userObj, thunkAPI) => {
        console.log("readUser from loginUser", userObj);
        //
        const obj = {
            method: "GET",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            // body: JSON.stringify(userObj)
        };
        //
        let endPoint="/readAllActivities"
        //
        let data = await fetch(serverUrl+endPoint, obj);
        let data2 = await data.json();
        console.log("api-response from thunk", data2);
        //
        return data2;
    }
    //
);


//deleting Activity
export const deleteActivity = createAsyncThunk(
    "users/deleteActivity",
    async (userObj, thunkAPI) => {
        console.log("deleteAcivity from thunk", userObj);
        //
        const obj = {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(userObj)
        };
        //
        let endPoint="/deleteActivity"
        //
        let data = await fetch(serverUrl+endPoint, obj);
        let data2 = await data.json();
        console.log("api-response from thunk", data2);
        //
        return data2;
    }
    //
);


//updating Activity
export const updateActivity = createAsyncThunk(
    "users/updateActivity",
    async (userObj, thunkAPI) => {
        console.log("updateActivity from thunk", userObj);
        //
        const obj = {
            method: "PATCH",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(userObj)
        };
        //
        let endPoint="/updateActivity"
        //
        let data = await fetch(serverUrl+endPoint, obj);
        let data2 = await data.json();
        console.log("api-response from thunk", data2);
        //
        return data2;
    }
    //
);

const initialState = {
    //createActivity
    creationArray: [],
    //readActivity
    readArray: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {

            if (Object.keys(action.payload)[0] === "error") {
                // console.log("error exists...");
            } else if (Object.keys(action.payload)[0] === "msg") {
                state.readArray = action.payload.result
                // console.log("state.creationArray",state.creationArray)
            }
        });
        builder.addCase(registerUser.pending, (state, action) => { });
        builder.addCase(registerUser.rejected, (state, action) => {});

        //reading all users
        builder.addCase(readAllUsers.fulfilled, (state, action) => {
            // console.log("readAllUsers fulfilled action.payload = ", action.payload);
            if (Object.keys(action.payload)[0] === "error") {
            } else if (Object.keys(action.payload)[0] === "msg") {
                state.readArray = action.payload.result;
                // console.log("state.readArray=> ",state.readArray)
            }
        });
        builder.addCase(readAllUsers.pending, (state, action) => {});
        builder.addCase(readAllUsers.rejected, (state, action) => {});
        
        //deleting Activity
        builder.addCase(deleteActivity.fulfilled, (state, action) => {

            if (Object.keys(action.payload)[0] === "error") {
                // console.log("error exists...");
            } else if (Object.keys(action.payload)[0] === "msg") {
                state.readArray = action.payload.result
                // console.log("state.creationArray",state.creationArray)
            }
        });
        builder.addCase(deleteActivity.pending, (state, action) => { });
        builder.addCase(deleteActivity.rejected, (state, action) => {});
        //updating Activity
        builder.addCase(updateActivity.fulfilled, (state, action) => {

            if (Object.keys(action.payload)[0] === "error") {
                // console.log("error exists...");
            } else if (Object.keys(action.payload)[0] === "msg") {
                state.readArray = action.payload.result
                // console.log("state.creationArray",state.creationArray)
            }
        });
        builder.addCase(updateActivity.pending, (state, action) => { });
        builder.addCase(updateActivity.rejected, (state, action) => {});
    }
});

export const { } = usersSlice.actions;
export default usersSlice.reducer;
