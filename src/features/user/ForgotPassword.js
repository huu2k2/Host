import {useState, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon  from '@heroicons/react/24/solid/CheckCircleIcon'

function ForgotPassword(){

    const INITIAL_USER_OBJ = {
        emailId : ""
    }
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [linkSent, setLinkSent] = useState(false)
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ)

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")
        navigate('/accuracy')
        if(userObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
        // else{
        //     setLoading(true)
        //     // Call API to send password reset link
        //     setLoading(false)
        //     setLinkSent(true)
        // }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setUserObj({...userObj, [updateType] : value})
    }

    return(
        <div className="min-h-screen bg-base-200 grid grid-cols-5">
            <div className='images_left col-span-3'>
                <LandingIntro />
            </div>
            <div className='right_login col-span-2'>
                <Link to="/login" className='flex hover:text-forgot_password'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                    Quay lại
                </Link>
                <div className='p-16 mt-16'>
                    <img src="./logo_new.png" alt="Aloper Admin Template" className='my-0 mx-auto pb-8 w-32 '/>
                    <h2 className='text-4xl font-black mb-2 text-center pt-4 text-text_dangnhap'>Quên mật khẩu</h2>
                    <p className='text-center text-base'>Vui lòng nhập địa chỉ email bạn đã đăng ký</p>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4 mt-8">
                            <InputText type="text" defaultValue={userObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />
                        </div>

                        
                        <button type="submit"
                        className={"btn mt-2 w-full outline-none border-forgot_password bg-forgot_password hover:border-red-400 hover:bg-red-400" + (loading ? " loading" : "")}>Xác nhận</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword