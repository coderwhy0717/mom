import React, { memo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {getIndexAction} from '../../store/actionCreators'
export default memo(function WYContent(props) {
    //网络请求数据
    const {info,keys} = props
    console.log("显示",props)
    const {index} = useSelector(state => ({
      index: state.getIn(['home','index'])
    }),shallowEqual)
    const [num,setNum] = useState(1)
    const dispatch = useDispatch()
    const changeAdd = () => {
     if(keys/2 > 1) {
      dispatch(getIndexAction(index + 10))
     }
        setNum(num + 1) 
    }
  return (
    <div>
                    { keys/2 > 1 ? index : num }
                    <button onClick={e => changeAdd()}>+10</button>
                    <div>{info},{keys}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
                    <div>{info}</div>
    </div>
  )
})
