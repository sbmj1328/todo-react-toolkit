import { combineReducers } from "@reduxjs/toolkit";
import todo from './slice/todoSlice';


const reducer = combineReducers({
   ...todo
})


export default reducer;