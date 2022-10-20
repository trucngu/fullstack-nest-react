import { ReactNode } from 'react'
import { IoAppsOutline, IoAtSharp, IoBagCheckOutline, IoInvertMode, IoPeople, IoPieChart, IoSubway } from 'react-icons/io5'
import { CRM } from '../containers/crm'
import { Dashboard } from '../containers/dashboard'
import { Invoices } from '../containers/invoices'
import { Orders } from '../containers/orders'
import { Reports } from '../containers/orders/reports'
import { Products } from '../containers/products'
import { AutomationFlow } from '../containers/products/automation-flow'
import { Categories } from '../containers/products/categories'

export interface RouteModel {
    title: string
    path: string
    icon?: ReactNode
    routes?: RouteModel[]
    element?: ReactNode
}

export const routes: RouteModel[] = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <IoPieChart />,
        element: <Dashboard />
    },
    {
        title: 'Inventory',
        path: '/inventory',
        icon: <IoSubway />,
        routes: [
            {
                title: 'Category',
                path: 'categories',
                element: <Categories />,
                icon: <IoAppsOutline />
            },
            {
                title: 'Products',
                path: 'products',
                element: <Products />,
                icon: <IoAtSharp />
            },
            {
                title: 'Automation',
                path: 'automation',
                element: <AutomationFlow />,
                icon: <IoBagCheckOutline />
            },
        ]
    },
    {
        title: 'Sales',
        path: '/sales',
        icon: < IoInvertMode />,
        routes: [
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
            {
                title: 'Reports',
                path: 'reports',
                element: <Reports />
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