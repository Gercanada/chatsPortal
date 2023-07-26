import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loading: false,
    show_comments:[],
    add_comments:[],
    delete_comments:[],
}

export const CommentsSlice = createSlice({
    name:"comments",
    initialState,
    reducers: {
     setComments: (state,{payload}) => {
      state.add_comments = payload;
     },
     setDeleteComments: (state,{payload}) =>{
        state.delete_comments = payload;
     },
     setGetComments: (state,{payload})=>{
        state.show_comments=payload;
     },
    }
})

export const {
setComments,
setDeleteComments,
setGetComments,
}= CommentsSlice.actions;

