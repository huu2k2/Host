import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import Login from '../features/user/Login'
import Accuracy from '../features/user/Accuracy'
import ChangePassword from '../features/user/ChangePassword'
import ForgotPassword from '../features/user/ForgotPassword'
function ExternalPage(){


    return(
        <div className="">
            <Login />
            {/* <Accuracy /> */}
            {/* <ForgotPassword /> */}
            {/* <ChangePassword /> */}
        </div>
    )
}

export default ExternalPage