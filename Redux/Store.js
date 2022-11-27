import { configureStore } from '@reduxjs/toolkit'
import  taskReducers from "../Redux/TaskReducer"

export default configureStore({
  reducer: {
    studentinfo: taskReducers,
    // taskID: taskReducers,
    // Dones: taskReducers,
    Images: taskReducers,
    // SelectedItem:taskReducers,
    // orderItems: taskReducers
    
  }
  
})