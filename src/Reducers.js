import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated:false,
    data:{
        title: null,
        description: null,
        author:null,
    }
}

const customReducer = createReducer(initialState, (builder)=>{
    builder
    .addCase("checkLogin", (state,action)=>{
        state.isAuthenticated = action.payload;
    })
    .addCase("checkLogout",(state,action)=>{
        // state.isLogin= !state.isLogin();
        state.isAuthenticated = action.payload;
    })
    .addCase("checkValue", (state,action)=>{
        const {title, description, author } = action.payload;
        state.data.title = title;
        state.data.description = description;
        state.data.author = author;
    });
    
});

export default customReducer