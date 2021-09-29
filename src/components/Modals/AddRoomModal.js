import { Form, Input, Modal } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { firebaseServices } from '../../firebase/services';

const AddRoomModal = () => {
    const { user } = useContext(AuthContext);
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const [form] = Form.useForm();
    const handleOk = () => {
        firebaseServices.addDocument('rooms', { ...form.getFieldsValue(), members: [user.uid] })
        form.resetFields();
        setIsAddRoomVisible(false);
    }
    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    };
    
    return (
        <div>
            <Modal
                title="Tạo phòng"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả phòng" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;
