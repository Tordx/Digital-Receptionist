
 import { createSlice } from '@reduxjs/toolkit'

 export const FacultySlice = createSlice({
   name: 'facultymodal',
   initialState: {
    facultyDatas: []
   },
   reducers: {

      setFacultyDatas: (state , action ) => {
        state.facultyDatas = action.payload
        console.log(action)
        console.log('action')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {setFacultyDatas} = FacultySlice.actions
 
 export default FacultySlice.reducer