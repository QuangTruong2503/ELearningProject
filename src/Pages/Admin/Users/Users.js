import React, { useEffect, useState } from 'react'
import { fetchAllUsers } from '../../../API/user';
import UsersTable from '../../../Component/Table/UsersTable';

function Users() {
    const [data, setData] = useState([]);
    const handleFetchUsers = async () =>{
        const results = await fetchAllUsers('Users');
        if(results === undefined){
            console.error("Không có dữ liệu")
            return;
        }
        setData(results);
    }
    useEffect(() =>{
        handleFetchUsers();
    },[])
  return (
    <UsersTable data={data} reloadData={handleFetchUsers}/>
  )
}

export default Users