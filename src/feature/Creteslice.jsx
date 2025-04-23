import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const FeactData=createAsyncThunk("StudentLmsData/FeactData",async()=>{
    const response=await axios.get("http://localhost:3000/posts")
    
    console.log(response.data);
    
    return response.data
})

export const AddData=createAsyncThunk("StudentLmsData/AddData",async(data)=>{
    const response=await axios.post("http://localhost:3000/posts",data)
    
    console.log(response.data);
    
    return response.data
})
export const EditData=createAsyncThunk("StudentLmsData/EditData",async(data)=>{
    const response=await axios.put(`http://localhost:3000/posts/${data.id}`,data)
    
    console.log(response.data);
    
    // return response.data
})
export const DeleteData=createAsyncThunk("StudentLmsData/DeleteData",async(data)=>{
    const response=await axios.delete(`http://localhost:3000/posts/${data}`)
    
    console.log(response.data);
    
    return response.data
})

const initialState = {
  StudentLmsData: [],
}
 const StudentLms=createSlice({
name:"StudentLmsData",
initialState,
extraReducers:(builder)=>{

    builder.addCase(FeactData.fulfilled,(state,action)=>{
      state.StudentLmsData=action.payload
    })
    builder.addCase(AddData.fulfilled,(state,action)=>{
        state.StudentLmsData=action.payload
      })
      builder.addCase(EditData.fulfilled,(state,action)=>{
        const index=state.StudentLmsData.find((it)=>it.id===action.payload.id)
        state.StudentLmsData[index]=action.payload
      })
      builder.addCase(DeleteData.fulfilled,(state,action)=>{
        state.StudentLmsData = state.StudentLmsData.filter((it) => it.id !==action.payload.id)
      })

}
    
 })
export default StudentLms.reducer