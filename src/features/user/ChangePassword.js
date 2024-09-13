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

const ChangePassword = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const INITIAL_LOGIN_OBJ = {
        password: "",
        emailId: ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (loginObj.emailId.trim() === "") return setErrorMessage("Tài khoản không được để trống")
        if (loginObj.password.trim() === "") return setErrorMessage("Mật khẩu không được để trống")
        else {
            setLoading(true)
            // gọi api kiểm tra login
            const responAuth = await auth(loginObj.emailId, loginObj.password)
            // truyền thông tin đăng nhập vào redux

            dispatch(setUser(responAuth))
            if (responAuth) {
                setLoading(false)

                // window.location.href = '/app/welcome'
                navigate('/app/welcome');
            } else {
                setLoading(false)
                return setErrorMessage("Đăng nhập thất bại!!!")

            }
        }
    } 

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })

    }
  return (
    <div className="min-h-screen bg-base-200 grid grid-cols-3">
        <div className='images_left col-span-2'>
            <LandingIntro />
        </div>
        <div className='right_login col-span-1 p-16 mt-16'>
                <img src="./logo_new.png" alt="Aloper Admin Template" className='my-0 mx-auto pb-8 w-32 '/>
                    <h2 className='text-4xl font-black mb-2 text-center pt-4 text-text_dangnhap'>Mật khẩu mới</h2>
                    <p className='text-center text-base'>Vui lòng nhập mật khẩu mới tại đây</p>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4 mt-8">

                        <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Mật khẩu mới" updateFormValue={updateFormValue} />
                        
                        <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Nhập lại mật khẩu mới" updateFormValue={updateFormValue} />
                        

                        </div>

                        <ErrorText styleClass="mt-8 text-forgot_password">{errorMessage}</ErrorText>
                        <button type="submit" 
                        className={"btn mt-2 w-full outline-none border-forgot_password bg-forgot_password hover:border-red-400 hover:bg-red-400" + (loading ? " loading" : "")}>Xác nhận</button>

                        {/* đăng kí tài khoản */}
                        {/* <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div> */}
                    </form>
        </div>
    </div>
  )
}

export default ChangePassword