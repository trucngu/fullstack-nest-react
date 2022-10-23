import { Button, Modal, Table, Form, Input, Checkbox, Select, notification } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Container } from '../../components/container'
import categoryService, { CategoryModel } from '../../services/category-service'
import styled from 'styled-components'

const Action = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
`

const { Option } = Select
const { confirm } = Modal

export const Categories = () => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const [categories, setCategories] = useState<CategoryModel[]>()

    useEffect(() => {
        loadAsync()
    }, [])

    const loadAsync = async () => {
        const categories = await categoryService.get()
        setCategories(categories)
    }

    const handleSubmit = async () => {
        const model = form.getFieldsValue()
        await categoryService.create(model)
        notification.success({
            message: 'Create category',
            description: `Category ${model.name} created successfully.`,
        })
        await loadAsync()
        setOpen(false)
    }

    const handleDelete = (record: CategoryModel) => {
        confirm({
            title: `Do you want to delete ${record.name} ?`,
            content: 'Delete will remove the category and it is irreversible',
            icon: <ExclamationCircleOutlined />,
            onOk: async () => {
                await categoryService.delete(record.id)
                notification.success({
                    message: 'Delete Successfully',
                    description: `Category ${record.name} deleted successfully.`,
                })
                await loadAsync()
            }
        })
    }

    const columns: ColumnsType<CategoryModel> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Active',
            dataIndex: 'isActive',
            width: '15%',
            key: 'isActive',
            render: (isActive: boolean, record: CategoryModel) => (
                <Checkbox checked={isActive}></Checkbox>
            )
        },
        {
            width: "5rem",
            render: (_: any, record: CategoryModel) => {
                return (
                    <Action>
                        <Button onClick={() => handleDelete(record)} type="primary" icon={<DeleteOutlined />} danger></Button>
                    </Action>
                )
            }
        }
    ]


    return (
        <Container>
            <h3>Category Management</h3>

            <div>
                <Button type="primary" onClick={() => setOpen(true)}>Create</Button>
            </div>

            <Table columns={columns} dataSource={categories} bordered />

            <Modal title="Create Category" open={open} onOk={handleSubmit} onCancel={() => setOpen(false)}>
                <Form layout="vertical" form={form}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea rows={4} maxLength={500} />
                    </Form.Item>
                    <Form.Item name="isActive" valuePropName="checked">
                        <Checkbox checked={true}>Is Active</Checkbox>
                    </Form.Item>
                    <Form.Item name="parentId" label="Parent Category">
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA!.children as unknown as string)
                                    .toLowerCase()
                                    .localeCompare((optionB!.children as unknown as string).toLowerCase())
                            }
                        >
                            {categories && categories.map(cat => {
                                return <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Container>
    )
}