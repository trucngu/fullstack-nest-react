import { ReactNode } from 'react'
import { IoPeople, IoPieChart, IoSubway } from 'react-icons/io5'
import { CRM } from '../containers/crm'
import { Dashboard } from '../containers/dashboard'
import { Invoices } from '../containers/invoices'
import { Orders } from '../containers/orders'
import { Products } from '../containers/products'

export interface Route {
    title: string
    path: string
    icon?: ReactNode,
    routes?: Route[],
    element?: ReactNode
}

export const routes: Route[] = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <IoPieChart />,
        element: <Dashboard />
    },
    {
        title: 'Sales',
        path: '/sales',
        icon: < IoSubway />,
        routes: [
            {
                title: 'Products',
                path: 'products',
                element: <Products />
            },
            {
                title: 'Orders',
                path: 'orders',
                element: <Orders />
            },
            {
                title: 'Invoices',
                path: 'invoices',
                element: <Invoices />
            },
        ]
    },
    {
        title: 'CRM',
        path: '/crm',
        icon: <IoPeople />,
        element: <CRM />
    },
]