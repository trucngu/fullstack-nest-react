import { Button, Divider, Input } from 'antd'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../hooks/use-auth'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Brand = styled.div`
    font-size: 20pt;
    text-align: center;
    padding: 2rem;
`

const Body = styled.div`
    padding: 10px;
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const auth = useAuth()

    const handleSignIn = async () => {
        await auth.login(username, password)
    }

    return (
        <Container>
            <Brand>Sign in</Brand>
            <Body>
                <Input onChange={e => setUsername(e.target.value)} size="large" placeholder='Username' />
                <Input onChange={e => setPassword(e.target.value)} size="large" placeholder='Password' type='password' />
                <Button size="large" type="primary" onClick={handleSignIn} block={true}>Login</Button>
                <Button size="large" block>Register</Button>
                <Divider />
            </Body>
        </Container>
    )
}