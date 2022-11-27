
 import { createSlice } from '@reduxjs/toolkit'

 export const taskReducers = createSlice({
   name: 'items',
   initialState: {
    studentinfo: [],
     taskID: 1,
     Dones:[],
     Images:[],
     orderItems: [],
     SelectedItem:null
   },
   reducers: {
     setStudentInfo: (state , action ) => {
       state.studentinfo = action.payload
       console.log(action)
       console.log('action')
     },
    //  setOrders: (state , action ) => {
    //   state.orderItems = action.payload
    //   console.log(action)
    //   console.log('action')
    // },
    //  setTaskId: (state , action)  => {
    //      state.taskID = action.payload
    //  },
    //  setDones: (state , action)  => {
    //    state.Dones = action.payload
    //  },
      setImages: (state , action)  => {
      state.Images = action.payload
      console.log(action)
      console.log('action')
      },
    //   setSelectedItem: (state , action)  => {
    //     state.SelectedItem = action.payload
    //     console.log(action)
    //     console.log('action')
    //     },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {
   setStudentInfo ,
  //  setTaskId , 
  //  setDones, 
   setImages, 
  //  setSelectedItem , 
  //  setOrders
  } = taskReducers.actions
 
 export default taskReducers.reducer