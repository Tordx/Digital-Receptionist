
 import { createSlice } from '@reduxjs/toolkit'

 export const AdminSlice = createSlice({
   name: 'adminmodal',
   initialState: {
    isOpen: false,
    adminData: []
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
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {openAdminModal , closeAdminModal , setAdminData} = AdminSlice.actions
 
 export default AdminSlice.reducer