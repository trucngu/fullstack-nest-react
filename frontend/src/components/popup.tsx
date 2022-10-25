import { Form, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FC, ReactNode } from 'react'

type Props = {
    children?: ReactNode
    open?: boolean
    onOk?: (model: any) => Promise<any>
    onCancel?: () => void
}
const Popup: FC<Props> = ({
    children,
    open,
    onOk,
    onCancel
}) => {

    const [form] = useForm()

    const handleOk = () => {
        onOk && onOk(form.getFieldsValue())
    }

    return (
        <Modal title="Create Category" open={open} onOk={handleOk} onCancel={onCancel}>
            <Form layout="vertical" form={form}>
                {children}
            </Form>
        </Modal>
    )
}