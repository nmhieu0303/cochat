import { Avatar, Typography, Button } from 'antd';
import React, { useEffect,useContext } from 'react';
import { auth, db } from '../../firebase/config';
import styled from 'styled-components'
import { AuthContext } from '../../Context/AuthProvider';
const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding:12px 16px;
    border-bottom: 1px solid rgba(82,38,83);

    .username{
        color:white;
        margin-left: 10px;
    }
`

const UserInfo = () => {


    const {user} = useContext(AuthContext)
    return (
        <WrapperStyled>
            <div>
                <Avatar src={user.photoURL}>{user.photoURL?'':user.displayName?.charAt(0).toUpperCase()}</Avatar>
                <Typography.Text className="username">{user.displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng xuất</Button>
        </WrapperStyled>
    );
}

export default UserInfo;
