
 import { createSlice } from '@reduxjs/toolkit'

 export const ClassSlice = createSlice({
   name: 'classmodal',
   initialState: {
    isOpen: false,
    courseData: []
   },
   reducers: {
      openClassModal: (state , action) => {
        state.isOpen = true
      },
      closeClassModal: (state , action) => {
        state.isOpen = false
      },
      setCourseData: (state , action ) => {
        state.courseData = action.payload
        console.log(action)
        console.log('action')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {openClassModal , closeClassModal , setCourseData} = ClassSlice.actions
 
 export default ClassSlice.reducer