import { Button, Col, Row } from 'antd';
import React from 'react';
import { auth } from '../../firebase/config';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';

const ChatRoom = (props) => {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Sidebar/>
                </Col>
                <Col span={18}>
                    <ChatWindow/>
                </Col>
            </Row>
        </div>
    );
}

export default ChatRoom;
