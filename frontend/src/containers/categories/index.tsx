import { Button, Modal, Table, Form, Input, Checkbox, Select, notification, TableColumnsType, Badge, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Container } from '../../components/container'
import categoryService, { CategoryModel } from '../../services/category-service'
import styled from 'styled-components'

const Action = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
`

const { Option } = Select
const { confirm } = Modal

type SelectOption = { id: number, text: string }

export const Categories = () => {
    const [show, setShow] = useState(false)
    const [form] = Form.useForm()
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [category, setCategory] = useState<CategoryModel>()
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([])

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        const categories = await categoryService.get()
        setCategories(categories)
    }

    const loadCategoryOptions = () => {
        const options: SelectOption[] = []
        const flattenOptions = (source: CategoryModel[], output: SelectOption[]) => {
            for (const cat of source) {
                output.push({ id: cat.key, text: cat.name })
                if (cat.children?.length ?? 0 > 0) {
                    flattenOptions(cat.children!, output)
                }
            }
        }

        flattenOptions(categories, options)

        setCategoryOptions(options)
    }

    const handleSubmit = async () => {
        const model = form.getFieldsValue()
        if (!!category?.key) {
            await categoryService.update(category!.key, model)
        }
        else {
            await categoryService.create(model)
        }

        notification.success({
            message: 'Successfully',
            description: `Category ${model.name} updated successfully.`,
        })
        await loadCategories()
        setShow(false)
    }

    const handleDelete = (record: CategoryModel) => {
        confirm({
            title: `Do you want to delete ${record.name} ?`,
            content: 'Delete will remove the category and it is irreversible',
            icon: <ExclamationCircleOutlined />,
            onOk: async () => {
                try {
                    await categoryService.remove(record.key)
                    notification.success({ message: 'Delete Successfully' })
                    await loadCategories()
                }
                catch (e) {
                    notification.error({ message: "Unable to delete category" })
                }
            }
        })
    }

    //TODO: refactor
    const handleEdit = async (model: CategoryModel) => {
        const result = await categoryService.getById(model.key)
        if (result) {
            const cat = result as CategoryModel
            setCategory(cat)
            showModal({ ...cat, parentId: cat.parent?.key })
        }
    }

    const handleOpenModal = () => {
        showModal()
    }

    const showModal = (model?: CategoryModel) => {
        loadCategoryOptions()
        if (model) {
            form.setFieldsValue(model)
        }
        else {
            form.resetFields()
        }
        setShow(true)
    }

    const columns: TableColumnsType<CategoryModel> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterMode: 'tree',
            filterSearch: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Children',
            render: (_: any, record: CategoryModel) => {
                return (
                    <span>
                        {record.children && record.children.map(x => {
                            return <Tag color="pink" key={x.key}>{x.name}</Tag>
                        })}
                    </span>
                )
            }
        },
        {
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: boolean, record: CategoryModel) => (
                <Tag color={isActive ? 'green' : 'pink'}>{isActive ? 'Active' : 'Inactive'}</Tag>
            )
        },
        {
            width: "150px",
            render: (_: any, record: CategoryModel) => {
                return (
                    <Action>
                        <Button onClick={() => handleEdit(record)} type="ghost" icon={<EditOutlined />}></Button>
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
                <Button type="primary" onClick={handleOpenModal}>Create</Button>
            </div>

            <Table columns={columns} dataSource={categories} bordered pagination={{ pageSize: 5 }} />

            <Modal title="Create Category" open={show} onOk={handleSubmit} onCancel={() => setShow(false)}>
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
                            {categoryOptions && categoryOptions.map(cat => {
                                return <Option key={cat.id} value={cat.id}>{cat.text}</Option>
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Container>
    )
}