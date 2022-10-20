import { Button, Modal, Table } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import apiClient from '../../api'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
export const Products = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ]

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ]

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const result = await apiClient.login('truc', 'Password1!')
        console.log(result?.accessToken)
        const products = await apiClient.getProducts()
        console.log(products)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <Container>
            <div>
                <Button type="default" onClick={showModal}>
                    Create
                </Button>
            </div>

            <Table dataSource={dataSource} columns={columns} />

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </Container>
    )
}