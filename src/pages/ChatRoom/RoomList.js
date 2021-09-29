import { Button, Collapse, Typography } from 'antd';
import React, { useMemo, useContext } from 'react';
import styled from 'styled-components'
import { PlusSquareOutlined } from '@ant-design/icons'
import useFireStore from '../../hooks/useFireStore';
import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&&{
        .ant-collapse-header,p{
            color:white;
        }
        .ant-collapse-content-box{
            padding: 0 40px
        }
        .add-room{
            color:white;
            padding-left:0;
        }
    }
`

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom:5px;
    color:white!important;
`


/*
    room = {
        name: 'Room name',
        description: 'Room description',
        members: [uid1 , uid2,...]
    }
*/
const RoomList = () => {
    const {
        roomList,
        isAddRoomVisible, setIsAddRoomVisible,
        setSelectedRoomId
    } = useContext(AppContext)

    const handleAddRoom = () => {
        setIsAddRoomVisible(!isAddRoomVisible)
    }

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh sách các phòng" key={'1'}>
                {
                    roomList?.map(room => (<LinkStyled key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                    >{room.name}</LinkStyled>))
                }
                <Button type="text" icon={<PlusSquareOutlined />} className="add-room"
                    onClick={handleAddRoom}
                >Thêm phòng</Button>
            </PanelStyled>
        </Collapse>
    );
}

export default RoomList;
