import React, { useEffect, useState } from 'react'
import { fetchAllUsers } from '../../../API/user';
import UsersTable from '../../../Component/Table/UsersTable';

function Users() {
    const [users, setUsers] = useState([]);
    const handleFetchUsers = async () =>{
        const results = await fetchAllUsers();
        if(results === undefined){
            console.error("Không có dữ liệu")
            return;
        }
        setUsers(results);
    }
    useEffect(() =>{
        handleFetchUsers();
    },[])
  return (
    <UsersTable users={users} reloadData={handleFetchUsers}/>
  )
}

export default Users