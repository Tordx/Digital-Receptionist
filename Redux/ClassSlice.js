
 import { createSlice } from '@reduxjs/toolkit'

 export const ClassSlice = createSlice({
   name: 'classmodal',
   initialState: {
    isOpen: false,
    classData: []
   },
   reducers: {
      openClassModal: (state , action) => {
        state.isOpen = true
      },
      closeClassModal: (state , action) => {
        state.isOpen = false
      },
      setClassData: (state , action ) => {
        state.classData = action.payload
        console.log(action)
        console.log('action')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {openClassModal , closeClassModal , setClassData} = ClassSlice.actions
 
 export default ClassSlice.reducer