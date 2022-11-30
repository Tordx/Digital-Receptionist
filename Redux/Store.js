import { configureStore } from '@reduxjs/toolkit'
import  taskReducers from "../Redux/TaskReducer"
import EventSlice from './EventSlice'
import AdminSlice from './AdminSlice'
import FacultySlice from './FacultySlice'
import ClassSlice from './ClassSlice'


export default configureStore({
  reducer: {
    // studentinfo: taskReducers,
    // taskID: taskReducers,
    // Dones: taskReducers,
    // Images: taskReducers,
    // SelectedItem:taskReducers,
    // orderItems: taskReducers
    essensials: taskReducers,
    eventmodal: EventSlice,
    adminmodal: AdminSlice,
    facultymodal: FacultySlice,
    classmodal: ClassSlice
  }
  
})