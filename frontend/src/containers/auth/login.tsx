import { useState } from 'react'
import styled from 'styled-components'
import { Button, Input } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7da;
    padding: 15rem;
    border-radius: 10px;
`

const Brand = styled.div`
    font-size: 20pt;
    text-align: center;
    padding: 2rem;
    font-weight: bolder;
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

type Login = {
    username: string,
    password: string
}

export const Login = () => {

    const [credential, setCredential] = useState<Login>()
    const auth = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/dashboard'

    const handleSignIn = async () => {
        await auth.login(credential!.username, credential!.password)
        navigate(from, { replace: true })
    }

    const handleChange = (e: any) => {
        setCredential({ ...credential!, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Brand>Spacesales</Brand>
            <Body>
                <Input name='username' value={credential?.username} onChange={handleChange} placeholder='Username' />
                <Input name='password' value={credential?.password} onChange={handleChange} placeholder='Password' type='password' />
                <Button type="primary" onClick={handleSignIn} block={true}>Login</Button>
                <Button block>Register</Button>
            </Body>
        </Container>
    )
}