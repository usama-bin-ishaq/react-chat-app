import { Container } from '@mui/material'
import React from 'react'
import NavBar from './NavBar'
import Users from './users'

const Home = () => {
    return (
        <Container>
            <NavBar />
            <Users />
        </Container>
    )
}

export default Home