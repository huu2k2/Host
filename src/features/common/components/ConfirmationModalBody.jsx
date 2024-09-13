import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { TYPES_DELETE, MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { deleteLead } from '../../leads/leadSlice'
import { showNotification } from '../headerSlice'
import FetchResetPasswordUser from '../../leads/components/service/fetchResetPasswordUser'

const deleteLeadAPI = (id) => {
    const tokenJWT = localStorage.getItem("token");
    fetch(`${process.env.BASE_URL}/accounts/delete-account/${id}`, {
        method: 'DELETE',
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${tokenJWT}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(data => {
           
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}



function ConfirmationModalBody({ extraObject, closeModal }) {

    const dispatch = useDispatch()

    const { message, type, id, index } = extraObject


    const proceedWithYes = async () => {
        if (type === TYPES_DELETE.LEAD_DELETE) {
            // positive response, call api or dispatch redux function
            deleteLeadAPI(id);
            dispatch(deleteLead({ index }))
            dispatch(showNotification({ message: "Xoá nhân viên thành công!", status: 1 }))
        }

        if (type === TYPES_DELETE.RESET_PASSWORD_USER) {
 
        
            const resultAPI = FetchResetPasswordUser(id);
            if(resultAPI){
                dispatch(showNotification({ message: "Đặt lại mật khẩu thành công", status: 1 }))
            }else{
                dispatch(showNotification({ message: "Đặt lại mật khẩu thất bại", status: 0 }))
            }
        }
        closeModal()
    }

    return (
        <>
            <p className=' text-xl mt-8 text-center'>
                {message}
            </p>

            <div className="modal-action mt-12">

                <button className="btn btn-outline   " onClick={() => closeModal()}>Huỷ bỏ</button>

                <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>Xác nhận</button>

            </div>
        </>
    )
}

export default ConfirmationModalBody