import { combineReducers } from "redux-immutable";

import { reducer as ceducerHome } from '../pages/home/store'

// 结合每个redux 文件
const cReducer = combineReducers({
    home: ceducerHome
})

export default cReducer