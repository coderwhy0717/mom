import React, { memo, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Dropdown, Menu,Button,Tabs } from 'antd';

import {useBattery,useGeolocation,useNetworkState} from 'react-use'
// import { WaterLevelPond } from '@jiaminghi/data-view-react'
import WYContent from './c-conps/content'
// import { useRequest,useCookieState } from 'ahooks'
import Localcache from '@/utils/cache'

import { HomeWrapper,HeaderWrapper,ContentWrapper,FooterWrapper} from './style'
// import { NavLink } from 'react-router-dom';
export default memo(function WYHome(props) {
    // const menu = (
    //     <Menux
    //         items={[
    //             {
    //             label: <div onClick={e => changeMessage('一级子菜单传送1')}>一级子菜单1</div>,
    //             key: '0',
    //             },
    //             {
    //             label: <div onClick={e => changeMessage('一级子菜单传2')}>一级子菜单2</div>,
    //             key: '1',
    //             },
    //             {
    //             label:<div onClick={e => changeMessage('一级子菜单3')}>一级子菜单3</div>,
    //             key: '3',
    //             },
    //         ]}
    //     />
    // )"["
   const {route} = props
   const { TabPane } = Tabs
   const [messages,setMessage] = useState([ {
    title: '一级子菜单1',
    content: <WYContent info={'一级子菜单1'} keys={1} />,//封装组件
    key: '1'
}]) 
 
// 存储当前页面的值 查看messages里是否有没有这个值 没有的话就使用默认值1
   const [activeKey, setActiveKey] = useState(messages[Localcache.getCache("activeKey")] ? Localcache.getCache("activeKey") : "1" );
  
   console.log(route)
   const batteryState = useBattery()
   const state = useGeolocation()
   const useNetwork = useNetworkState();
   console.log(batteryState ,'aa')
   console.log(state,"b")
   console.log(useNetwork,"cc")
   useEffect(() => {
        Localcache.setCache("activeKey",activeKey)
        // Localcache.setCache("activeKey",activeKey)
   },[activeKey])
   if(!Localcache.getCache('token') && Localcache.getCache('token') !== -1) {
    // 判断否登录.
        return  <Redirect to='/login' />
    }
    // if(!useNetwork.online) {
    //     return <div className='info'>未连接网络...你在玩屁啊 滚犊子吧，sb,你在狗叫什么？？？</div>
    // }
    const changeMessage = (item) => {
        const index = messages.findIndex(items => items.title === item.title)
        if(index === -1) {
            setActiveKey(item.key)
            setMessage([...messages,item])
        }else {
            setActiveKey(item.key)

        }
        
    }
    const infoTitle = [ 
        {
            name:'一级1',
            items:
                [
                    {
                        label: <div onClick={e => changeMessage(
                            {
                                title: '一级子菜单1',
                                content: <WYContent info={'一级子菜单1'} keys={1} />,//封装组件
                                key: '1'
                            }
                        )}>一级子菜单1</div>,
                        key: '1'
                    },
                {
                label: <div onClick={e => changeMessage({ title: '一级子菜单2',
                content: <WYContent info={'一级子菜单2'} keys={2}/>,
                key: '2'})}>一级子菜单2</div>,
                key: '2',
                },
                {
                label:<div onClick={e => changeMessage({ title: '一级子菜单3',
                content: <WYContent info={'一级子菜单3'} keys={3}/>,
                key: '3'})}>一级子菜单3</div>,
                key: '3',
                },
            ]
        },
        {
            name:'一级2',
            items:
                [
                {
                label: <div onClick={e => changeMessage({
                    title: '一级2子菜单1',
                    content: <WYContent info={'一级2子菜单1'}keys={4} />,
                    key: '4'
                })}>一级子2菜单1</div>,
                key: '4',
                },
                {
                label: <div onClick={e => changeMessage({ title: '一级2子菜单2',
                content: <WYContent info={'一级2子菜单2'} keys={5}/>,
                key: '5'})}>一级子2菜单2</div>,
                key: '5',
                },
                {
                label:<div onClick={e => changeMessage({ title: '一级2子菜单3',
                content: <WYContent info={'一级2子菜单33'} keys={6}/>,
                key: '6'})}>一级子2菜单3</div>,
                key: '6',
                },
            ]
        },
        {
            name:'一级3',
            items:
                [
                {
                label: <div onClick={e => changeMessage({
                    title: '一级3子菜单1',
                    content: <WYContent info={'一级3子菜单1'} keys={7}/>,
                    key: '7'
                })}>一级3子菜单1</div>,
                key: '7',
                },
                {
                label: <div onClick={e => changeMessage({ title: '一级3子菜单2',
                content: <WYContent info={'一级3子菜单2'} keys={8}/>,
                key: '8'})}>一级3子菜单2</div>,
                key: '8',
                },
                {
                label:<div onClick={e => changeMessage({ title: '一级3子菜单3',
                content: <WYContent info={'一级3子菜单33'} keys={9} />,
                key: '9'})}>一级3子菜单3</div>,
                key: '9',
                },{
                    label:<div onClick={e => changeMessage({ title: '一级3子菜单4',
                    content: <WYContent info={'一级3子菜单44'} keys={10} />,
                    key: '10'})}>一级3子菜单4</div>,
                    key: '10',
                    },{
                        label:<div onClick={e => changeMessage({ title: '一级3子菜单5',
                        content: <WYContent info={'一级3子菜单555'} keys={11}/>,
                        key: '11'})}>一级3子菜单5</div>,
                        key: '11',
                        },
            ]
        }
    ]

  const onChange = (key) => {
    setActiveKey(key);
  };
 
  const remove = (targetKey) => {
    const targetIndex = messages.findIndex((pane) => pane.key === targetKey);
    const newPanes = messages.filter((pane) => pane.key !== targetKey);

    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key)
    }
    setMessage(newPanes);
  };
  const onEdit = (targetKey, action) => {
      console.log(targetKey,action)
    if (action === 'add') {
    } else {
      remove(targetKey);
    }
  };
//   const data = {
//       data:[batteryState.level*100]
//   }
   
  return (
    <HomeWrapper>
        <div>
        {
            /* {
                useNetwork.online ? '' : '无网络。。。'
            }
                <div className='water'>当前电量：{batteryState.level*100} %
                <WaterLevelPond config={data} style={{width: '30px', height: '40px'}} waveNum ={100} waveHeight={10} />
                    </div>
                {   
            
                    batteryState.charging ? <div>{batteryState.level === 1 ? '已充满电' : '充电中...'}</div> : '未充电'
                } */
        }

            {/* {
                formatDate(batteryState.dischargingTime * 1000,'ss')
            } */}
            {/* {
                batteryState.chargingTime === 0 ? '' : <div>充电时间：{batteryState.chargingTime}</div>
            } */}
        </div>
      
        {/* <img src={`data:image/jpeg;base64,${data.data}`} alt=""></img> */}
        <HeaderWrapper>迦南智能MOM报表查询系统</HeaderWrapper>
        <div className='menu'>
            {
                infoTitle.map((item,index) => {
                    return (
                        <div key={index} className="table-title">
                            <Dropdown overlay={<Menu items={item.items}  />}  placement="bottom" >
                                <Button>{item.name}</Button>
                            </Dropdown>
                             
                        </div>
                    )
                })
            }
        </div>
        <ContentWrapper>
            {
                messages[0] ? 
                    <Tabs hideAdd 
                        type="editable-card" 
                        onChange={onChange} 
                        activeKey={activeKey} 
                        onEdit={onEdit}
                        >
                            {
                                messages.map((pane) => (
                                    <TabPane tab={pane.title} key={pane.key}>
                                        {pane.content}
                                    </TabPane>
                                ))
                            }
                    </Tabs> : ''
            }
        </ContentWrapper>
        <FooterWrapper>
            <div className='wrap-v2'>
                <div className='logo'>
                    <img src={`${require('@/assets/img/logo_03.png')}`} alt='logo'></img>
                    <div className='color'>宁波迦南智能电气股份有限公司版权所有</div>
                    <div className='color'>地址：慈溪市开源路315号</div>
                    <div className='color'>开发团队：智能装备部</div>
                    {/* <div className='color' onClick={e=>run()}>aa{data?.data}</div> */}
                </div>
                
            </div>
        </FooterWrapper>
    </HomeWrapper>
  )
})
