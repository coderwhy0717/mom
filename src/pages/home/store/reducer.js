import { Map } from "immutable";

import * as actionType from './constans'

const defaultState = Map({
    index:0
})


function reducer(state = defaultState,action) {
    switch(action.type) {
        case actionType.INDEX:
            return state.set("index",action.index)
        default:
            return state
    }
}

export default reducer