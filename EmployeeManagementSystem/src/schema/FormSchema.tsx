import {z} from "zod";

export const formSchema = z.object({
    id:z.number(),
    username: z.string()
            .nonempty("UserName is Required!")
            .min(3, "Username must be at least 3 Character!")
            .max(20, "Username does not exist more than 20 characters!")
            .regex(/^[A-Za-z]{3,}( [A-Za-z]{3,})?$/, "Invalid UserName Formate!"),

    email: z.string()
            .nonempty("Email is Required!")
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email Formate!"),

     password: z.string()
                .min(8, "Password must have at least 8 characters!")
                .regex(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  "Invalid Password format! Must include uppercase, lowercase, digit, special char."
                ),

    confirmpassword: z.string().nonempty("Confirm password is required!"),

    age: z.string()
          .min(1, "Age is required")
          .refine((val) => Number(val) > 18, {
            message: "Age must be above 18",
          }),
    
    joiningdate: z.string().nonempty("Joining date is Required!"),

    gender: z.enum(["Male", "Female","Others"],{error:"Please Provide the Gender!"}),

    country: z.enum(["India", "America", "Sweden", "Russia", "Singapore"],{error:"Please Provide the Country Name!"}),

    skills : z.array(z.string()).min(1, "Please Provide at least one skill"),

    bio:z.string().optional(),

    daterange: z.tuple([z.date().optional(), z.date().optional()]).refine(([start , end])=>start && end,{
        message:"Please select the date range!"
    })
})
.refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"], 
  })
// .refine((data)=>Number(data.age) > 18,{
//   message:"Age must be above 18",
//   path:["age"]
// })
// .superRefine((data, ctx)=>{
//     if(data.joiningdate > new Date().toISOString().split('T')[0]){
//         ctx.addIssue({
//             path:["joiningdate"],
//             code:z.ZodIssueCode.custom,
//             message:"date must not be future date!"
//         })
//     }
// })

export type FormData = z.infer<typeof formSchema>;