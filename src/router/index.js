import React from "react";
import { Redirect } from 'react-router-dom'

const routes = [
    {
        path:'/',
        exact:true,
        render:() => (
            <Redirect to="/painting" />
        )
    },
    {
        path:'/painting',
        component: React.lazy(() => import("@/pages/painting"))
    },
    {
        path:'/login',
        component: React.lazy(() => import("@/pages/login"))
    },
    {
        path:'/home',
        component: React.lazy(() => import("@/pages/home")),
        // routes:[
        //     {
        //         path:'/home'
        //     }
        // ]
    }
]

export default routes