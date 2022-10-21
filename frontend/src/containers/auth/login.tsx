import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Divider, Input } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import { FlexRow } from '../../components/flex-row'

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
    const [rememberMe, setRememberMe] = useState(false)

    const auth = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/dashboard'

    useEffect(() => {
        const loginJson = localStorage.getItem('remember_me')
        if (loginJson) {
            const login = JSON.parse(loginJson)
            setUsername(login.username)
            setPassword(login.password)
            setRememberMe(login.rememberMe)
        }
    }, [])

    const handleSignIn = async () => {
        await auth.login(username, password)
        if (rememberMe) {
            localStorage.setItem('remember_me', JSON.stringify({ username, password, rememberMe }))
        }
        navigate(from, { replace: true })
    }

    return (
        <Container>
            <Brand>Sign in</Brand>
            <Body>
                <Input value={username} onChange={e => setUsername(e.target.value)} size="large" placeholder='Username' />
                <Input value={password} onChange={e => setPassword(e.target.value)} size="large" placeholder='Password' type='password' />
                <FlexRow><Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} id="check" /> <label htmlFor='check'>Remember me ?</label></FlexRow>
                <Button size="large" type="primary" onClick={handleSignIn} block={true}>Login</Button>
                <Button size="large" block>Register</Button>
            </Body>
        </Container>
    )
}