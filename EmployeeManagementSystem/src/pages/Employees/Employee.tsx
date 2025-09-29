import EmployeeForm from '../../components/EmployeeForm/EmployeeForm'
import useLocalStorage from '../../hooks/useLocalStorage'
// import {z} from "zod";
// import type { formSchema } from '../../schema/FormSchema';
import { toast } from 'react-toastify';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import type {FormData} from '../../schema/FormSchema'
import { useCallback, useState } from 'react';

// export type FormData = z.infer<typeof formSchema>

const Employee = () => {
    const [userData , setUserDate] = useLocalStorage<FormData[]>("EMployee",[])
    const [editData, setEditDate] = useState<FormData |null>(null);

    const onSubmit = useCallback((Employee:FormData)=>{
      if(editData){
        setUserDate(prev=>prev.map(user => user.id === Employee.id ? Employee : user));
        setEditDate(null);
        toast.success("Employee has been Successfully Updated!", {
            position: "top-right",
            theme: "dark",
        });
      }
      else{
        const newID = userData.length==0 ? 1 : (userData[userData.length-1].id ?? 0)+1;
        setUserDate(prev=>[...prev,{...Employee,id:newID}]);

        toast.success("Employee has been Successfully Registered!", {
            position: "top-right",
            theme: "dark",
        });
        }
    },[editData, setUserDate, setEditDate]);


//     const onSubmit = useCallback((Employee: FormData) => {
//   setUserDate(prev => {
//     if (editData) {
//       // Update existing employee
//       return prev.map(user => user.id === Employee.id ? Employee : user);
//     } else {
//       // Add new employee with a new ID
//       const newID = prev.length === 0 ? 1 : (prev[prev.length - 1].id ?? 0) + 1;
//       return [...prev, { ...Employee, id: newID }];
//     }
//   });

//   if (editData) {
//     setEditDate(null);
//     toast.success("Employee has been Successfully Updated!", {
//       position: "top-right",
//       theme: "dark",
//     });
//   } else {
//     toast.success("Employee has been Successfully Registered!", {
//       position: "top-right",
//       theme: "dark",
//     });
//   }
// }, [editData, setUserDate, setEditDate]);


    const onDelete = useCallback((Employee:FormData)=>{
      setUserDate(prev=>prev.filter((d)=>d.id!=Employee.id));

        toast.success(`${Employee.username} has been Deleted Successfully !`, {
            position: "top-right",
            theme: "dark",
        });
    },[])

    console.log("Parent Rendering")
    return (
      <div>
        <EmployeeForm submitHandler={onSubmit} editUser={editData}/>
        <EmployeeList 
          userData={userData} 
          deletedUser={onDelete}
          editeHandler ={setEditDate}
        />
      </div>
    )
}

export default Employee
