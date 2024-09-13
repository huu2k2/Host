import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import firebase from './components/firebase';

function Register() {
    const INITIAL_REGISTER_OBJ = {
        name: "",
        password: "",
        emailId: "",
        otp: ""
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
    const [isEmailValid, setIsEmailValid] = useState(false);
    useEffect(() => {
        setUpRecaptcha();
    }, []);
    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            'recaptcha-container',
            {
                'size': 'invisible',
                defaultCountry: 'VN',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            });
    }
    const sendOtp = async(phoneNumber) => {
        const phoneNumberWithCountryCode = `+84${phoneNumber}`; 
        const appVerifier = window.recaptchaVerifier;
        await firebase.auth().signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                alert("OTP is sent");
            }).catch((error) => {
                // Error; SMS not sent
                alert("OTP ERROR"+error);
            });
    }

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     setErrorMessage("");

    //     if (registerObj.name.trim() === "") return setErrorMessage("Name is required!");
    //     if (registerObj.emailId.trim() === "") return setErrorMessage("Phone number is required!");
    //     if (registerObj.password.trim() === "") return setErrorMessage("Password is required!");
    //     if (registerObj.otp.trim() === "") return setErrorMessage("OTP is required!");

    //     setLoading(true);
    //     // Simulate API call and save token in localstorage
    //     localStorage.setItem("token", "DummyTokenHere");
    //     setLoading(false);
    //     window.location.href = '/app/welcome';
    // };
    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");

        window.confirmationResult.confirm(registerObj.otp).then((result) => {
            alert("OTP is correct");
        }).catch((error) => {
            setErrorMessage("OTP is invalid");
            alert("OTP is invalid");
        });
    };
    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setRegisterObj({ ...registerObj, [updateType]: value });
        if (updateType === "emailId") {
            setIsEmailValid(/^\d{10}$/.test(value));
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div>
                        <LandingIntro />
                    </div>
                    <div className='py-20 px-10'>
                        <img src="./logo_new.png" alt="Aloper Admin Template" className='my-0 mx-auto' />
                        <h2 className='text-2xl font-semibold mb-2 text-center pt-4 text-text_dangnhap'>Đăng ký</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Phone" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                                <div className="flex place-items-end mt-3" >
                                    <div className="flex place-items-end">
                                        <InputText defaultValue={registerObj.otp} type="text" updateType="otp" containerStyle="mt-3" labelTitle="OTP" updateFormValue={updateFormValue} />
                                        <button type="button" className="btn btn-primary border-l-forgot_password bg-forgot_password ml-2" disabled={!isEmailValid} onClick={() => sendOtp(registerObj.emailId)}>Get OTP</button>
                                    </div>
                                </div>
                            </div>
                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary border-forgot_password bg-forgot_password" + (loading ? " loading" : "")}>Register</button>
                            <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
            <div id='recaptcha-container'></div>
        </div>
    );
}

export default Register;
