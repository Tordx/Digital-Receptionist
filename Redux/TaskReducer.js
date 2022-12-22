
 import { createSlice } from '@reduxjs/toolkit'

 export const taskReducers = createSlice({
   name: 'items',
   initialState: {
    studentinfo: [],
     Images:[],
     user:[],
   },
   reducers: {
     setStudentInfo: (state , action ) => {
       state.studentinfo = action.payload
       console.log(action)
       console.log('action')
     },
     setUser: (state , action ) => {
      state.user = action.payload
      console.log(action)
      console.log('action')
    },
      setImages: (state , action)  => {
      state.Images = action.payload
      console.log(action)
      console.log('action')
      },
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {
   setStudentInfo ,
   setImages, 
    setUser,
  } = taskReducers.actions
 
 export default taskReducers.reducer