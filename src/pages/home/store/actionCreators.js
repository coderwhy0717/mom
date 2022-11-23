import * as actionType from './constans'

const changeHomeIndex = index => ({
    type: actionType.INDEX,
    index
})

export function getIndexAction(index) {
    return dispatch => {
        dispatch(changeHomeIndex(index))
    }
}