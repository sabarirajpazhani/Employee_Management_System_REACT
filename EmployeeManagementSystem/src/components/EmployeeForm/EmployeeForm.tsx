import { Button, Form } from "react-bootstrap"
import './EmployeeForm.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import { formSchema } from "../../schema/FormSchema";
import {z} from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";

type FormData = z.infer<typeof formSchema>

type FormType = {
    submitHandler:(Employee:FormData)=>void
    editUser:FormData | null;
}

const EmployeeForm = React.memo(({submitHandler,editUser}:FormType) => {

    const {register, handleSubmit,control,reset,  formState:{errors, touchedFields},watch} = useForm<FormData>({
        defaultValues:{
        id:0,
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
        age:"",
        joiningdate:"",
        gender:undefined,
        country:undefined,
        skills:[],
        bio:"",
        daterange:[undefined, undefined]
    },
    resolver:zodResolver(formSchema), mode:"onChange"})

    const onSubmitHandler =(data:FormData)=>{
        console.log(data);
        console.log('Before call');
        
        submitHandler({...data, daterange:[data.daterange[0] ? new Date(data.daterange[0]) : undefined, data.daterange[1] ? new Date(data.daterange[1]):undefined]});
        console.log('after call');
        
        reset({
            id:0,
            username:"",
            email:"",
            password:"",
            confirmpassword:"",
            age:"",
            joiningdate:"",
            gender:undefined,
            country:undefined,
            skills:[],
            bio:"",
            daterange:[undefined, undefined]
        });
        console.log('After reset call');
        
    }

    useEffect(() => {
        if (editUser) {
            reset(editUser);
        }
    }, [editUser, reset]);


    console.log("Form Rendering")
    return (
        <div className="form"> 
        <h2 className="formHeader">Employee Register Form</h2>
        <Form  onSubmit={handleSubmit(onSubmitHandler)} className="formMain" noValidate >
            {/* UserName  */}
            <Form.Group >
            <Form.Label>UserName</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter the UserName" 
                {...register("username")} 
                isInvalid={!!errors.username}
                isValid={!errors.username && touchedFields.username && !!watch("username")}
            />
            <Form.Control.Feedback type="invalid">
                {errors.username?.message}
            </Form.Control.Feedback>
            </Form.Group> <br />

            {/* Email  */}
            <Form.Group >
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter the Email"  
                {...register("email")}
                isInvalid={!!errors.email}
                isValid={touchedFields.email && !errors.email && !!watch("email")}
            />
            <Form.Control.Feedback type="invalid">
                {errors.email?.message}
            </Form.Control.Feedback>
            </Form.Group> <br />

            {/* password  */}
            <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Enter the Password"  
                {...register("password")}
                isInvalid={!!errors.password}
                isValid={touchedFields.password && !errors.password}
                
            />
            <Form.Text style={{color:"white"}}>Minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char</Form.Text>
            <Form.Control.Feedback type="invalid">
                {errors.password?.message}
            </Form.Control.Feedback>
            </Form.Group> <br />

            {/* Confirm password  */}
            <Form.Group >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Enter the confirm Password"  
                {...register("confirmpassword")}
                isInvalid={!!errors.confirmpassword}
                isValid={!errors.confirmpassword && touchedFields.confirmpassword }
            />
            <Form.Control.Feedback type="invalid">
                {errors.confirmpassword?.message}
            </Form.Control.Feedback>
            </Form.Group> <br />

            {/* age  */}
            <Form.Group >
            <Form.Label>Age</Form.Label>
            <Form.Control 
                type="number" min={0}   
                placeholder="Enter the Age" 
                {...register("age")}
                isInvalid={!!errors.age}
                isValid={touchedFields.age && !errors.age && !!watch("age")}
            />
            <Form.Control.Feedback type="invalid">
               {errors.age?.message}
            </Form.Control.Feedback>
            </Form.Group> <br />


            {/* Joining date  */}
            <Form.Group >
            <Form.Label>Joining Date</Form.Label>
            <Form.Control 
                style={{width:'200px'}}  
                type="date" max={new Date().toISOString().split('T')[0]} 
                placeholder="Enter the Age" 
                {...register("joiningdate")}
                isInvalid={!!errors.joiningdate}
                isValid={touchedFields.joiningdate && !errors.joiningdate && !!watch("joiningdate")}
            />
            <Form.Control.Feedback type="invalid">
                {errors.joiningdate?.message}
            </Form.Control.Feedback>
            </Form.Group> <br />


            {/* Gender  */}
            <Form.Group >
            <Form.Label>Gender</Form.Label>
            <div>
                {["Male", "Female","Others"].map((gender, index)=>(
                    <Form.Check
                        key={index}
                        type="radio"
                        // name="gender"
                        label={gender}
                        value={gender}
                        {...register("gender")}
                        // isInvalid={!!errors.gender}
                        // isValid={touchedFields.gender && !errors.gender &&!!watch("gender")}
                    />
                ))}
            </div>
            {/* <Form.Control type="password" placeholder="Enter the confirm Password"  /> */}
            {/* <Form.Control.Feedback type="invalid">
                {errors.gender?.message}
            </Form.Control.Feedback> */}
            {errors.gender && (
                <p style={{color:"red"}}>{errors.gender?.message}</p>
            )}
            </Form.Group> <br />
            

            {/* Country  */}
            <Form.Group >
            <Form.Label>Country</Form.Label>
            <Form.Select 
                {...register("country")}
                isInvalid={!!errors.country}
                isValid={touchedFields.country && !errors.country && !watch("country")}
            >
                <option>-- Select --</option>
                {["India", "America", "Sweden", "Russia", "Singapore"].map((c,index)=>(
                    <option key={index} value={c}>{c}</option>
                ))}
            </Form.Select>
            
            <Form.Control.Feedback type="invalid">
                {errors.country?.message}
            </Form.Control.Feedback>
            </Form.Group> <br />

            {/* Skills  */}
            {/* <Form.Group >
            <Form.Label>Skills</Form.Label>
            <Form.Select multiple>
                {["C#", ".NET Core", "JAVA", "Python", "React", "SQL Server", "Web API"].map((c,index)=>(
                    <option key={index} value={c}>{c}</option>
                ))}
            </Form.Select>
            
            <Form.Control.Feedback type="invalid">
                Please provide a valid state.
            </Form.Control.Feedback>
            </Form.Group> <br /> */}
            <Form.Group >
            <Form.Label>Skills</Form.Label>
            <div className="checkbox">
                {["C#", ".NET Core", "JAVA", "Python", "React", "SQL Server", "Web API"].map((s, index)=>(
                    <Form.Check 
                        key={index}
                        type="checkbox"
                        // name="skills"
                        label={s}
                        value={s}
                        {...register("skills")}
                        isInvalid={!!errors.skills}
                        isValid={touchedFields.skills && !errors.skills && !!watch("skills")}
                    />
                ))}
            </div>
            
            {/* <Form.Control.Feedback type="invalid">
                {errors.skills?.message}
            </Form.Control.Feedback> */}
            {errors.skills && (
                <p style={{color:"red"}}>{errors.skills?.message}</p>
            )}
            </Form.Group> <br />
            
            {/* bio  */}
            <Form.Group >
            <Form.Label>Bio</Form.Label>
            <Form.Control 
                as="textarea" rows={4} 
                placeholder="Enter the your bio" 
                {...register("bio")}
                isInvalid={!!errors.bio}
                isValid={touchedFields.bio && !errors.bio && !watch("bio")}
            />
            {/* <Form.Text></Form.Text> */}
            <Form.Control.Feedback type="invalid">
               {errors.bio?.message}
            </Form.Control.Feedback>
            </Form.Group> <br />

            {/* Date Range  */}
            <Form.Group >
            <Form.Label>Date Range</Form.Label> <br />
           
                <Controller
                    control={control}
                    name="daterange"
                    render={({field})=>{
                        const[start, end] = field.value || [undefined, undefined];
                        return(
                            <DatePicker
                                selectsRange
                                startDate={start}
                                className={`form-control bg-white ${errors.daterange ? "is-invalid" : start && end ?"is-valid" :""}`}
                                endDate={end}
                                onChange={(update:[Date | null, Date | null]) => {
                                    field.onChange(update)
                                }}
                                showYearDropdown
                                scrollableMonthYearDropdown
                                withPortal
                                isClearable={true}
                                placeholderText="dd-mm-yyyy"
                            />
                            
                        )
                    }}
                />
                
                {errors.daterange && (
                <p className="text-danger">{errors.daterange.message}</p>
            )}
           
            {/* <Form.Control.Feedback type="invalid">
                Please provide a valid state.
            </Form.Control.Feedback> */}
            </Form.Group> <br />




            <div className="button">
                <Button  style={{ backgroundColor: "rgb(167, 89, 239)" }}  type="submit">Submit form</Button>
            </div>
        </Form>
        </div>
    )
})

export default EmployeeForm
