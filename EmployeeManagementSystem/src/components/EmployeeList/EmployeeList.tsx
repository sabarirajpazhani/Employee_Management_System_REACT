import { Badge, Button, Form, Table } from 'react-bootstrap'
import './EmployeeList.css'
import type { FormData } from '../../schema/FormSchema'
import React, { useMemo, useState } from 'react'


type UserDataType={
    userData: FormData[],
    deletedUser:(Employee:FormData)=>void,
    editeHandler:(Employee:FormData)=>void
}

const EmployeeList = React.memo(({userData,deletedUser,editeHandler} :UserDataType ) => {


    console.log("List Rendering")


  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

 
  const countries = ["India", "America", "Sweden", "Russia", "Singapore"];

  
   const filteredData = useMemo(() => {
    return userData.filter(user => {
      const matchCountry = selectedCountry === "All" || user.country === selectedCountry;
      const matchSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCountry && matchSearch;
    });
  }, [userData, selectedCountry, searchTerm]);

      

    const handleDelete =(user:FormData)=>{
        deletedUser(user);
    }

    const handleEdit=(user:FormData)=>{
        editeHandler(user);
    }
  return (
    <div className='p-3'>
      <h2 className='employeeListHeader'>Employee Details</h2>

       <Form.Select
        className='mb-3 w-25'
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="All">All Countries</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </Form.Select>

      <Form.Control
          type="text"
          placeholder="Search by username"
          className="w-25"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      <Table  striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Password</th>
          <th>Age</th>
          <th>JoiningDate</th>
          <th>Gender</th>
          <th>Country</th>
          <th>Skills</th>
          <th>Bio</th>
          <th>DateRange</th>
          <th className='action'>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((user,index)=>(
            <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.age}</td>
                <td>{user.joiningdate}</td>
                <td>{user.gender}</td>
                <td>{user.country}</td>
                <td >{user.skills.map((skill,index)=>(
                    <Badge className='mx-1' bg="secondary" key={index}>{skill}</Badge>
                ))}</td>
                <td>{user.bio ? user.bio : (<p className='bio'>No Bio</p>)}</td>
                <td>{user.daterange.toLocaleString().split(',').map((date,index)=>(<p className='date' key={index}>{date.split('T')[0]}</p>))}</td>
                <td className=''>
                    <Button onClick={()=>handleEdit(user)} className="btn-warning m-4">Edit</Button>
                    <Button onClick={()=>handleDelete(user)} className='btn-danger'>Delete</Button>
                </td>

            </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
});

export default EmployeeList
