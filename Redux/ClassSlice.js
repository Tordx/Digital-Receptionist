
 import { createSlice } from '@reduxjs/toolkit'

 export const ClassSlice = createSlice({
   name: 'classmodal',
   initialState: {
    courseData: [],
    orgData: []
   },
   reducers: {
      setCourseData: (state , action ) => {
        state.courseData = action.payload
        console.log(action)
        console.log('action')
      },
      setOrgData: (state , action ) => {
        state.orgData = action.payload
        console.log(action)
        console.log('action')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const { setCourseData, setOrgData} = ClassSlice.actions
 
 export default ClassSlice.reducer