import { UserAddOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import form from 'antd/lib/form';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { firebaseServices } from '../../firebase/services';
import useFireStore from '../../hooks/useFireStore';
import Message from './Message';

const WrapperStyled = styled.div`
    height: 100vh;
`;

const HeaderStyled = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    height:56px;
    padding:0 15px;
    border: 1px solid rgb(230,230,230);
    .header{
        &__info{
            display:flex;
            justify-content:center;
            flex-direction:column;
        }
        &__title{
            margin:0;
            font-weight:bold;
        }
        &__description{
            font-size:12px
        }
    }
`;
const ContentStyled = styled.div`
    height: calc(100vh - 56px);
    display:flex;
    flex-direction:column;
    padding:11px;
    justify-content: flex-end;
`;

const MemberGroupStyled = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;

const MessageListStyled = styled.div`
    max-height:100%;
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230,230,230);
    border-radius: 2px;
    .ant-form-item{
        flex:1;
        margin-bottom:0;
    }
`;

const data = {
    displayName: 'Nguyen Hieu',
    photoURL: null,
    text: 'Demo message',
    createAt: 1231233123355
}

const ChatWindow = () => {
    const { user: { uid, photoURL, displayName } } = useContext(AuthContext);
    const { selectedRoom, selectedRoomId, members, setIsInviteMenberVisible } = useContext(AppContext)
    const [message, setMessage] = useState('');
    // const room =  useMemo(() => {
    //    return roomList?.find(room => room.id === selectedRoomId)
    // }, [roomList, selectedRoomId])

    const condition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        value: selectedRoomId
    }), [selectedRoomId])

    const messages = useFireStore('messages', condition)


    const renderMembers = () => {
        return members?.map(member => {
            return <Tooltip title={member.displayName} key={member.uid} >
                <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0).toUpperCase()}</Avatar>
            </Tooltip>
        })
    }

    const handleMessageSubmit = () => {
        firebaseServices.addDocument('messages', {
            text: message,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName,
        })
        setMessage('')
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }



    const renderMessageList = () => {
        return messages?.map(message => {
            const styleMessage = uid === message.uid? 'my-message':`friend-message`
            return <Message key={message.id} message={message} className={styleMessage} />
        })
    }
    return (
        <WrapperStyled>
            {selectedRoom ? <>
                <HeaderStyled>
                    <div className="header__info">
                        <p className="header__title">{selectedRoom?.name}</p>
                        <span className="header__description">{selectedRoom?.description}</span>
                    </div>
                    <MemberGroupStyled>
                        <Button type="text" icon={<UserAddOutlined />}
                            onClick={() => setIsInviteMenberVisible(true)}
                        >
                            Mời
                        </Button>
                        <Avatar.Group maxCount={2}>
                            {renderMembers()}
                        </Avatar.Group>
                    </MemberGroupStyled>
                </HeaderStyled>
                <ContentStyled>
                    <MessageListStyled>
                        {renderMessageList()}
                    </MessageListStyled>
                    <FormStyled >
                        <Form.Item>
                            <Input
                                value={message}
                                onChange={handleMessageChange}
                                onPressEnter={handleMessageSubmit}
                                name='text'
                                placeholder="Nhập tin nhắn..."
                                bordered={false}
                                autoComplete="off"
                            />
                        </Form.Item>
                        <Button type="primary" onClick={handleMessageSubmit}>Gửi</Button>
                    </FormStyled>
                </ContentStyled>

            </> : (
                <Alert
                    message='Vui lòng chọn phòng'
                    showIcon
                    type='info'
                    closable
                    style={{ margin: 5 }}
                />
            )}
        </WrapperStyled>
    );
}

export default ChatWindow;
