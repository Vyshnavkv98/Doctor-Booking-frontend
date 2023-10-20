import {combineReducers} from '@reduxjs/toolkit'
import userReducer from '../redux/user'
import adminReducer from '../redux/admin'
import doctorReducer from '../redux/doctor'
import searchReducer from '../redux/searchDoctor'
import appointmentReducer from '../redux/appointment'
import videocallReducer from '../redux/videocall'

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    doctor: doctorReducer,
    searchKeyword: searchReducer,
    appointment: appointmentReducer,
    videocall:videocallReducer
  });
  
  export default rootReducer;