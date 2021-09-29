import React, { useContext, useMemo, useState } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider(props) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [isInviteMenberVisible, setIsInviteMenberVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')
    

    const { user } = useContext(AuthContext)

    const condition = useMemo(() => ({
        fieldName: 'members',
        operator: 'array-contains',
        value: user.uid
    }), [user.uid])

    const roomList = useFireStore('rooms', condition)
    const selectedRoom = useMemo(() => {
        return roomList?.find(room => room.id === selectedRoomId)
    }, [roomList, selectedRoomId]
    )
    // Lấy danh sách thành viến trong room
    const membersCondition = useMemo(() => ({
        fieldName: 'uid',
        operator: 'in',
        value: selectedRoom?.members
    }), [selectedRoom?.members])
    const members = useFireStore('users', membersCondition)
    
    const values = {
        roomList,
        isAddRoomVisible, setIsAddRoomVisible,
        selectedRoomId, setSelectedRoomId,
        isInviteMenberVisible, setIsInviteMenberVisible,
        selectedRoom,
        members
    }
    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    );
}


