import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { auth } from '../../app/auth'
import { useDispatch } from 'react-redux'
import { setUser } from "./userSlice"
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const Accuracy = () => {
    // const INITIAL_OTP_OBJ = {
    //     valueotp : []
    // }
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [linkSent, setLinkSent] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(""))

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(otp.trim() === "")return setErrorMessage("Itp is required! (only number)")
        // else{
        //     setLoading(true)
        //     setLoading(false)
        //     setLinkSent(true)
        // }
        navigate('/change-password');
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setOtp({...otp, [updateType] : value})
    }

    const handleChange = (el, index) => {
        if(isNaN(el.value)) return false;

        setOtp([...otp.map((data, i) => (i===index? el.value : data))])

        if(el.nextSibling) {
            el.nextSibling.focus();
        }
    }

    const handleOTP = () => {
        otp.join("");

    }

  return (
   
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
                <div className='p-16 mt-16 rounded-xl'>
                    <img src="./logo_new.png" alt="Aloper Admin Template" className='my-0 mx-auto pb-8 w-32 '/>
                    <h2 className='text-4xl font-black mb-2 text-center pt-4 text-text_dangnhap'>Nhập mã xác thực</h2>
                    <p className='text-center text-base'>Chúng tôi đã gửi mã xác minh đến địa chỉ email</p>
                    <p className='text-center text-base font-sans text-black'>+aloper@gmail.com</p>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4 mt-8 w-[100%] flex flex-row gap-2">
                            {otp.map((data, i) =>{
                                return (
                                    <InputText type="text" 
                                        name="OTP"
                                        className="border-2 w-6 h-12 text-2xl m-auto text-center "
                                        maxLength={1}
                                        key={i}
                                        value={data}
                                        onFocus={e=>e.target.select()}
                                        onChange={e => handleChange(e.target, i)} 
                                        containerStyle="mt-4" 
                                        // updateFormValue={updateFormValue}
                                    />
                                )
                            })}
                        </div>
                        <span className='block text-base text-center font-medium tracking-[1px] my-6'>Mã sẽ hết hạn trong 1:00</span>
                        <button type="submit" onClick={handleOTP()}
                            className={"btn mt-2 w-full outline-none border-forgot_password bg-forgot_password hover:border-red-400 hover:bg-red-400" + (loading ? " loading" : "")}>Xác thực
                        </button>
                        <p className='block text-base mt-5 text-center font-light'>Bạn đã không nhận mã xác thực ?</p>
                        <p className='block text-base mt-2 text-center text-forgot_password'>Gửi lại</p>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Accuracy