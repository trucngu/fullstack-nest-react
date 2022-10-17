import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Route } from '../../constants/routes'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import * as themes from '../../constants/themes'
import { IoChevronDown, IoChevronForward, IoRemoveOutline } from 'react-icons/io5'

const Container = styled.div`
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
`

const Header = styled.div`
    color: ${themes.COLOR_TEXT};
    padding: 8px 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
        gap: 5px;
        display: flex;
        align-items: center;
    }

    :hover,
    &.active {
        cursor: pointer;
    }
`

const NavItem = styled(NavLink)`
    width: 100%;
    color: ${themes.COLOR_TEXT};
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 15px;

    :hover,
    &.active {
        color: ${themes.COLOR_TEXT};
        background-color: ${themes.COLOR_LEVEL_3};
    }
`

const Body = styled.div<{
    isOpen?: boolean
}>`
    width: 100%;
    /* hack: 1000px */
    max-height: ${props => props.isOpen ? '1000px' : '0'};
    overflow: hidden;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    padding: 0 ${props => props.isOpen ? '15px' : '0'};
    color: ${themes.COLOR_TEXT};
`

interface MenuItemProps extends Route {
}
export const MenuItem: FC<MenuItemProps> = ({
    title,
    path,
    icon,
    routes
}) => {
    const hasChild = !!routes && routes.length > 0
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = (e: any) => {
        setIsOpen(!isOpen)
    }

    const getPath = (p: string) => `${path}/${p}`

    if (hasChild) {
        return (
            <Container>
                <Header onClick={toggleMenu}>
                    <span>{icon && icon}{title}</span>
                    {hasChild && (
                        <>
                            {isOpen ? <IoChevronDown /> : <IoChevronForward />}
                        </>
                    )}
                </Header>
                <Body isOpen={isOpen}>
                    {hasChild && routes.map((r, k) => {
                        return (
                            <MenuItem
                                key={k}
                                path={getPath(r.path)}
                                title={r.title}
                                icon={r.icon}
                                routes={r.routes}
                            />
                        )
                    })}
                </Body>
            </Container>
        )
    }

    return (
        <NavItem to={path}>{icon && icon}{!icon && <IoRemoveOutline />}{title}</NavItem>
    )
}