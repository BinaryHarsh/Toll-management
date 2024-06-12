import * as Yup from "yup";
const pattern = /^[0-9]{10}$/
export const createUserschema = Yup.object({
    first_name:Yup.string().min(2).max(25).required("Please Enter First Name"),
    last_name:Yup.string().min(2).max(25).required("Please Enter Last Name"),
    username:Yup.string().min(2).max(25).required("Please Enter Username"),
    password:Yup.string().min(6).required("Please Enter Password"),
    email:Yup.string().email().required("Please Enter Email "),
    mobile_number:Yup.string().matches(pattern, 'Must be exactly 10 digits').required("Please Enter Mobile Number"),
    role_id:Yup.number().required("Please Select Role"),
    shift_id:Yup.number().required("Please Select Shift")
});

export const shiftschema = Yup.object({
    shift_name:Yup.string().min(2).max(25).required("Please Enter Shift Name"),
    start_time:Yup.string().required("Please Enter Start Time"),
    end_time:Yup.string().required("Please Enter End Time"),
})

export const signupschema = Yup.object({
    amit:Yup.string().min(4,"Username Must be at Least 4 Characters").max(25,"Username Must be at Most 25 Characters").required("Username is Required"),
    india:Yup.string().min(6,"Password must be at Least 6 Characters").required("Please Enter Password Here")
})

export const vechiclecreteschema = Yup.object({
    vehicle_class:Yup.string().required("Please Enter This Field"),
    selection_key:Yup.string().required("Please Enter This Field"),
    description:Yup.string().required("Please Enter This Field"),
    allow_speed:Yup.string().required("Please Enter This Field"),
    anpr_class:Yup.string().required("Please Enter This Field"),
    image_url:Yup.string().required("Please Enter This Field"),
    tag_class:Yup.string().required("Please Enter This Field"),
    status:Yup.string().required("Please Enter This Field"),
})

export const fareschema = Yup.object({
    PLAZA_ENTRY:Yup.string().required("Please Enter This Field"),
    PLAZA_EXIT:Yup.string().required("Please Enter This Field"),
    CLASS_DESCRIPTION:Yup.string().required("Please Enter This Field"),
    TOLL_FARE:Yup.string().required("Please Enter This Field"),
})

export const blockinvalidkey = (e) => ["e", "+", "E", ".", "-"].includes(e.key) && e.preventDefault();
