import { IoPieChart } from 'react-icons/io5'
import { NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { routes } from '../../constants/routes'
import * as themes from '../../constants/themes'
import { MenuItem } from './menu-item'

const LayoutContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`

const SideNav = styled.nav`
    height: 100vh;
    flex-shrink: 0;
    width: 280px;
    display: flex;
    flex-direction: column;
    background-color: ${themes.COLOR_LEVEL_1};
    color: ${themes.TEXT_COLOR};
`

const Brand = styled.div`
    font-size: 18pt;
    padding: 15px;
    text-align: center;
`

const SideNavMenu = styled.nav`
    display: flex;
    flex-direction: column;
`

const MainContent = styled.main`
    display: flex;
    flex-direction: column;
`

export const Layout = () => {
    return (
        <LayoutContainer>
            <SideNav>
                <Brand>SpaceSales</Brand>
                <SideNavMenu>
                    {routes.map((r, k) => {
                        return (
                            <MenuItem path={r.path} title={r.title} icon={r.icon} routes={r.routes} />
                        )
                    })}
                </SideNavMenu>
            </SideNav>
            <MainContent>
                <Outlet />
            </MainContent>
        </LayoutContainer >
    )
}

