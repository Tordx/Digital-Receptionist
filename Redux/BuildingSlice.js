
 import { createSlice } from '@reduxjs/toolkit'

 export const BuildingSlice = createSlice({
   name: 'buildingmodal',
   initialState: {
    isOpen: false,
    buildingData: []
   },
   reducers: {
      openBuildingModal: (state , action) => {
        state.isOpen = true
      },
      closeBuildingModal: (state , action) => {
        state.isOpen = false
      },
      setBuildingData: (state , action ) => {
        state.buildingData = action.payload
        console.log(action)
        console.log('action')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {openBuildingModal , closeBuildingModal , setBuildingData} = BuildingSlice.actions
 
 export default BuildingSlice.reducer