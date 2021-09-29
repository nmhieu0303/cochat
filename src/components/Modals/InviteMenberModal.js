import { Avatar, Form, Input, Modal, Select, Spin } from 'antd';
import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { firebaseServices } from '../../firebase/services';
import { debounce } from 'lodash'
import { db } from '../../firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout, curMembers])

    useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin /> : null}
        {...props}
    >
        {options.map(opt =>(
            <Select.Option key={opt.value} value={opt.value} label={opt.label}>
                <Avatar size='small' src={opt.photoURL}>{opt.photoURL ? '' : opt.label?.charAt(0).toUpperCase()}</Avatar>
                {`${opt?.label}`}
            </Select.Option>
        ))}
    </Select>
}


const InviteMenberModal = () => {
    const { user } = useContext(AuthContext);
    const { selectedRoom,selectedRoomId, isInviteMenberVisible, setIsInviteMenberVisible } = useContext(AppContext);
    const [value, setValue] = useState([])
    const [form] = Form.useForm();
    const handleOk = () => {
        const roomRef = db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members: [...selectedRoom?.members,...value.map(val=>val.value)]
        })
        setValue([])
        setIsInviteMenberVisible(false);
    }
    const handleCancel = () => {
        form.resetFields();
        setIsInviteMenberVisible(false);
    };

    async function fetchOptions(keyword,curMembers) {
        return db.collection('users')
            .where('keywords', "array-contains", keyword)
            .orderBy('displayName').limit(20).get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,

                })).filter(item => !curMembers?.includes(item.value))
            })
    }
    
    return (
        <div>
            <Modal
                title="Thêm thành viên"
                visible={isInviteMenberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode="multiple"
                        placeholder="Tên các thành viên"
                        value={value}
                        fetchOptions={fetchOptions}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom?.members}
                    />
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMenberModal;
