import { ReactNode } from 'react'
import { IoAppsOutline, IoPieChart, IoSubway } from 'react-icons/io5'
import { Categories } from '../containers/categories'

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
        element: <h1>Dashboard</h1>
    },
    {
        title: 'Sales',
        path: '/sales',
        icon: <IoSubway />,
        routes: [
            {
                title: 'Category',
                path: 'categories',
                element: <Categories />,
                icon: <IoAppsOutline />
            }
        ]
    }
]