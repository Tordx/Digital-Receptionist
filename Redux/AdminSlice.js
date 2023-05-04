
 import { createSlice } from '@reduxjs/toolkit'

 export const AdminSlice = createSlice({
   name: 'adminmodal',
   initialState: {
    isOpen: false,
    adminData: [],
    adminLoginInfo: []

   },
   reducers: {
      openAdminModal: (state , action) => {
        state.isOpen = true
      },
      closeAdminModal: (state , action) => {
        state.isOpen = false
      },
      setAdminData: (state , action ) => {
        state.adminData = action.payload
        console.log(action)
        console.log('action')
      },
      setAdminLoginInfo: (state , action ) => {
        state.adminLoginInfo = action.payload
        console.log('adminlogininfo')
        console.log(action)
        console.log('adminlogininfo')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {openAdminModal , closeAdminModal , setAdminData , setAdminLoginInfo} = AdminSlice.actions
 
 export default AdminSlice.reducer