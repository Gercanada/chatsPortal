import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    typeId: [],
    ticketId: [],
    assignedTo: [],
}

export const selectSlice = createSlice({
    name:"selects",
    initialState,
    reducers: {
     setTypeId: (state,{payload}) => {
      state.typeId = payload;
     },
     setTicketId: (state,{payload}) =>{
        state.ticketId = payload;
     },
     setAssignedTo: (state,{payload})=>{
        state.assignedTo=payload;
     },
    }
})


export const { setLoading, setTicketId, setAssignedTo, setTypeId } = selectSlice.actions;
