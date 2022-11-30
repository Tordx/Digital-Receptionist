
 import { createSlice } from '@reduxjs/toolkit'

 export const FacultySlice = createSlice({
   name: 'facultymodal',
   initialState: {
    isOpen: false,
    facultyData: []
   },
   reducers: {
      openFacultyModal: (state , action) => {
        state.isOpen = true
      },
      closeFacultyModal: (state , action) => {
        state.isOpen = false
      },
      setFacultyData: (state , action ) => {
        state.facultyData = action.payload
        console.log(action)
        console.log('action')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {openFacultyModal , closeFacultyModal , setFacultyData} = FacultySlice.actions
 
 export default FacultySlice.reducer