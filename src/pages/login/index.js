import React, { memo, useRef } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import { Redirect } from 'react-router-dom'
import { useRequest } from 'ahooks';

import Localcache from '@/utils/cache'
import {getDetail} from '../../services/login'

import {getPlaySongDetail} from '../../services/login'
import { LoginWrapper } from './style'
// import Password from 'antd/lib/input/Password';

export default memo(function WYLogin() {
    // const [name,setName] = useState(localCache.getCache('name') ?? '')
    // const [password,setPassword] = useState(localCache.getCache('password') ?? '')
   
    const nameRef = useRef()
    // console.log(nameRef,"nam")
    const passwordRef = useRef()
    const checkedRef = useRef()
    const { data:dataMessges} = useRequest(getDetail)
    // 直接获取 账号、密码 存值 第一次 获取不到 
    const {data,loading,run} = useRequest(getPlaySongDetail,{
        manual:true,
        onSuccess:(res) => {
            console.log(res,"res")
            if(res.token !== "-1") {
                // 1.请求成功后 token存储本地
                Localcache.setCache('token',res.token)
                // 2.判断是 记住密码 / 忘记密码
                if(checkedRef.current.input.checked) {
                    Localcache.setCache('name',nameRef.current.input.value)
                    Localcache.setCache('password',passwordRef.current.input.value)
                }else {
                    // Localcache.deleteCache('name')
                    Localcache.deleteCache('password')
                }
            }
        }
    })

    if(Localcache.getCache('token')) {
        return  <Redirect to='/home' />
    }
   
    
    const changeLogin = () => {
        console.log(nameRef)
        if(nameRef.current.input.value && passwordRef.current.input.value) {
             
            
            // 2.获取 账号 密码
            // setName(nameRef.current.input.value)
            // setPassword(passwordRef.current.input.value)
            // 3.发送网络请求登录验证
            run({name:nameRef.current.input.value,passWord:passwordRef.current.input.value})
        }
       
       
    }
        if(Localcache.getCache("name") && Localcache.getCache("password")) {
            //  = '123'
            // console.log(,passwordRef)
            // nameRef.current.input.value = '123'
            // console.log(Localcache.getCache("name"),Localcache.getCache("password"))
        }
        console.log(dataMessges,"dataMessges")
        console.log(data,"dataMessges")
  return (
    <LoginWrapper>
            
        <div className='login'>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            //   onFinish={onFinish}
            >
                <div className='title'>
                    MOM报表查询系统</div>
            <Form.Item
                name="username"
               
                rules={[
                {
                    required: true,
                    message: '请输入账号!',
                }
                ]}
            >
                <Input  defaultValue={Localcache.getCache("name")}
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="账号" 
                        ref={nameRef}
                />
            </Form.Item>
            <Form.Item
                initialValue={Localcache.getCache("password")}
                name="password"
                rules={[
                {
                    required: true,
                    message: '请输入密码!',
                },
                ]}
            >
                <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                ref={passwordRef}
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox ref={checkedRef}>记住密码</Checkbox>

                </Form.Item>
                {/* <a className="login-form-forgot" href="/#">
                Forgot password
                </a> */}
            </Form.Item>

            <Form.Item>
                <Button type="primary" 
                        htmlType="submit" 
                        className="login-form-button"
                        onClick={e => changeLogin()}
                        loading={loading}
                        >
                    {
                        loading ? 'loading...' : '登录'
                    }
                </Button>
                {/* Or <a href="/#">register now!</a> */}
            </Form.Item>
            </Form>
        </div>
    </LoginWrapper>
  )
})
