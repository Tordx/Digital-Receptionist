
 import { createSlice } from '@reduxjs/toolkit'

 export const modalSlice = createSlice({
   name: 'modal',
   initialState: {
    isOpen: false,
    eventData: []
   },
   reducers: {
      openModal: (state , action) => {
        state.isOpen = true
      },
      closeModal: (state , action) => {
        state.isOpen = false
      },
      setEventData: (state , action ) => {
        state.eventData = action.payload
        console.log(action)
        console.log('action')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {openModal , closeModal , setEventData} = modalSlice.actions
 
 export default modalSlice.reducer