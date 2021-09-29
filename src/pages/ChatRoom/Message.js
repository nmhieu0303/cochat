import { Avatar, Typography } from 'antd';
import { formatRelative } from 'date-fns';
import React from 'react';
import styled from 'styled-components'


const WrapperStyled = styled.div`
    margin-bottom:10px;
    .author{
        margin-left:5px;
        font-weight:bold;
    }
    .date{
        margin-left:5px;
        font-size: 11px;
        color: #a7a7a7a;
    }
    .content{
        margin-left:30px;
    }
    .my-message{
        background: #096dd9;
        max-width: 45%;
        padding: 10px;
        border-radius: 5px;
        margin-left:auto;
        .author,.date,.content{
            color:#fff;
        }
    }
    .friend-message{
        background: #ededed;
        max-width: 45%;
        padding: 10px;
        border-radius: 5px;
    }
`;

const formatDate = (seconds) => {
    let formatDate = '';
    if (seconds) {
        formatDate = formatRelative(new Date(seconds * 1000), new Date())

        formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
    }
    return formatDate;
}
const Message = ({ message, ...props }) => {
    return (
        <WrapperStyled >
            <div {...props}>
                <div>
                    <Avatar size="small" src={message.photoURL}>{message.photoURL ? '' : message.displayName?.charAt(0).toUpperCase()}</Avatar>
                    <Typography.Text className="author">{message.displayName}</Typography.Text>
                    <Typography.Text className="date">{formatDate(message.createAt?.seconds)}</Typography.Text>
                </div>
                <div>
                    <Typography.Text className="content">{message.text}</Typography.Text>
                </div>
            </div>
        </WrapperStyled>
    );
}

export default Message;
