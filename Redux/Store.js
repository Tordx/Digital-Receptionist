import { configureStore } from '@reduxjs/toolkit'
import  taskReducers from "../Redux/TaskReducer"
import EventSlice from './EventSlice'
import AdminSlice from './AdminSlice'
import FacultySlice from './FacultySlice'
import ClassSlice from './ClassSlice'
import BuildingSlice from './BuildingSlice'


export default configureStore({
  reducer: {
    essensials: taskReducers,
    eventmodal: EventSlice,
    adminmodal: AdminSlice,
    facultymodal: FacultySlice,
    classmodal: ClassSlice,
    buildingmodal:BuildingSlice
  }
  
})