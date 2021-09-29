import React, { useEffect ,useState} from 'react';
import { db } from '../firebase/config';


/*
    condition = {
        fieldName, operator, value
    }
*/

const useFireStore = (collection, condition) => {
    const [documents, setDocuments] = useState([])
    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createAt')

        // Thực hiện lọc dữ liệu
        if (condition) {
            if (!condition.value || condition.value.length === 0) return
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.value)
        }

        //Covert data về kiểu array
        const unsubscribed =  collectionRef.onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }))
            setDocuments(data)
        })

        return ()=>{
            unsubscribed()
        }
    }, [collection,condition])
    return documents
}
export default useFireStore;