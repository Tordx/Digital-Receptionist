
 import { createSlice } from '@reduxjs/toolkit'

 export const EventSlice = createSlice({
   name: 'eventmodal',
   initialState: {
    isOpen: false,
    eventData: []
   },
   reducers: {
      openEventModal: (state , action) => {
        state.isOpen = true
      },
      closeEventModal: (state , action) => {
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
 export const {openEventModal , closeEventModal , setEventData} = EventSlice.actions
 
 export default EventSlice.reducer