import { Input } from 'antd'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { routes } from '../../constants/routes'
import * as themes from '../../constants/themes'
import { MenuItem } from './menu-item'

const LayoutWrapper = styled.div`
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
    color: ${themes.COLOR_TEXT};
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

const Content = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    
`

const TopNav = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    width: 100%;
    height: 60px;
    background-color: ${themes.COLOR_TOP_NAV};
    border-bottom: 1px solid ${themes.BORDER_COLOR};
`

const OutletWrapper = styled.div`
    padding: 15px;
`

const { Search } = Input

export const Layout = () => {

    const onSearch = (value: string) => {
        console.log(value)
    }

    return (
        <LayoutWrapper>
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
            <Content>
                <TopNav>
                    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 300 }} />
                </TopNav>
                <OutletWrapper>
                    <Outlet />
                </OutletWrapper>
            </Content>
        </LayoutWrapper >
    )
}

