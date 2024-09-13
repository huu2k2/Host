import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"
import InputDate from "../../../components/Input/InputDate"
import InputFile from "../../../components/Input/InputFile"
import SelectBox from "../../../components/Input/SelectBox"


import { jwtDecode } from "jwt-decode"
import SelectBankAPI from './input/SelectBankAPI'




const INITIAL_LEAD_OBJ = {
    userName: "",
    email: "dotruong@gmail.com",
    phoneNumber: "",
    password: "",
    telegramId: "",
    identification: "",
    issuedBy: "",
    dateRange: "",
    ownerId: "",
    fullName: "",
    role: "MainManager",
    signature: "",
    bankCode: "",
    bOD: "",
    address: "",
    accountNumber: "",
    accountName: "",
    position: "",
}

const position = [
    {
        "name": "Chủ nhà",
        "value": "Chủ nhà"
    },
    {
        "name": "Quản lý",
        "value": "Quản lý"
    },
]


const switchRole = (role) => {

    switch (role) {
        case 'Admin':
            return 0
        case 'HouseHolder':
            return 1
        case 'MainManager':
            return 2
        case 'Manager':
            return 3
        default:
            return 3
    }
}

function AddLeadModalBody({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [periodOptions, setperiodOptions] = useState([])
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)



    // lấy token trong localStorage
    const tokenJWT = localStorage.getItem("token");

    // role người dùng đăng nhập
    const userRole = switchRole(jwtDecode(tokenJWT).Role)


    //danh sách role
    const { roles } = useSelector(state => state.role)



    useEffect(() => {
        // lọc nhưng roles bé hơn role hiện tại để thêm nhân viên
        const filteredRoles = roles.filter((role, index) => index > userRole);

        // mặc định thêm phần ownerId
        setLeadObj({ ...leadObj, ownerId: jwtDecode(tokenJWT).Id })
        setperiodOptions(filteredRoles)


    }, [])


    const addEmployeeAPI = async (leadObj) => {
        const token = localStorage.getItem('token')
        return fetch(`${process.env.REACT_APP_BASE_URL}/accounts/sign-up`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(leadObj)
        })
            .then(data => {
                if (data.ok) {

                    return true
                } else {
                    return false
                }
            })
            .catch(error => {
                console.error('Lỗi:', error)
                return false
            });
    }

    const saveNewLead = async () => {
        if (leadObj.fullName.trim() === "") return setErrorMessage("Họ tên không được bỏ trống!")
        else if (leadObj.userName.trim() === "") return setErrorMessage("Tên đăng nhập id không được bỏ trống!")
        else if (leadObj.telegramId.trim() === "") return setErrorMessage("telegramId không được bỏ trống!")
        else if (leadObj.bOD.trim() === "") return setErrorMessage("ngày sinh không được bỏ trống!")
        else if (leadObj.phoneNumber.trim() === "") return setErrorMessage("SĐT không được bỏ trống!")
        else if (leadObj.identification.trim() === "") return setErrorMessage("CMND không được bỏ trống!")
        else if (leadObj.dateRange.trim() === "") return setErrorMessage("ngày cấp không được bỏ trống!")
        else if (leadObj.issuedBy.trim() === "") return setErrorMessage("Nơi cấp không được bỏ trống!")
        else if (leadObj.address.trim() === "") return setErrorMessage("Địa chỉ không được bỏ trống!")
        else if (!leadObj.bankCode) return setErrorMessage("Ngân hàng không được bỏ trống!")
        else if (leadObj.accountNumber.trim() === "") return setErrorMessage("Số tài khoản không được bỏ trống!")
        else if (leadObj.accountName.trim() === "") return setErrorMessage("Tên chủ khoản không được bỏ trống!")
        else {
            // khởi tạo đối tượng
            let newLeadObj = { ...leadObj }


            const resultAPIAddEmployeeAPI = await addEmployeeAPI(leadObj)


            if (resultAPIAddEmployeeAPI) {
                // thông báo thành công
                dispatch(addNewLead({ newLeadObj }))
                dispatch(showNotification({ message: "thêm nhân viên thành công", status: 1 }))
                // closeModal()
            } else {
                dispatch(showNotification({ message: "thêm nhân viên thất bại", status: 0 }))
            }

        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLeadObj({ ...leadObj, [updateType]: value, password: leadObj.userName })
    }


    return (
        <>
            <div className="text-xl font-semibold ">Thông tin khách hàng</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputText type="text" defaultValue={leadObj.fullName} updateType="fullName" containerStyle="mt-1" labelTitle="Họ Tên" updateFormValue={updateFormValue} format="fullName" />
                <InputText type="number" defaultValue={leadObj.userName} updateType="userName" containerStyle="mt-1" labelTitle="Tên đăng nhập" updateFormValue={updateFormValue} />
                <InputText type="number" defaultValue={leadObj.telegramId} updateType="telegramId" containerStyle="mt-1" labelTitle="ID telegram" updateFormValue={updateFormValue} />

                <SelectBox
                    options={periodOptions}
                    labelTitle="Nhóm quyền"
                    placeholder="Lựa chọn chức vụ"
                    containerStyle="mt-1 w-80"
                    defaultValue="2"
                    updateType="role"
                    updateFormValue={updateFormValue}
                />
            </div>
            <div className="divider mt-1"></div>
            <div className="text-xl font-semibold ">THÔNG TIN NGƯỜI ĐẠI DIỆN KÍ HỢP ĐỒNG</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* custom input text sao cho tự động đồng bộ name ở trên */}
                <>
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Họ Tên</span>
                        </label>
                        <input type={"text"} value={leadObj.fullName} disabled={true} placeholder="" onChange={(e) => updateFormValue(e.target.value)} className="input  input-bordered w-full " />
                    </div>
                </>
                <InputDate type="date" defaultValue='' updateType="bOD" containerStyle="mt-1" labelTitle="Ngày sinh" updateFormValue={updateFormValue} />
                <InputText type="number" defaultValue={leadObj.phoneNumber} updateType="phoneNumber" containerStyle="mt-1" labelTitle="Số điện thoại" updateFormValue={updateFormValue} />
                <InputText type="number" defaultValue={leadObj.identification} updateType="identification" containerStyle="mt-1" labelTitle="CMND/CCCD/Hộ chiếu" updateFormValue={updateFormValue} />
                <InputDate type="date" defaultValue='' updateType="dateRange" containerStyle="mt-1" labelTitle="Ngày cấp" updateFormValue={updateFormValue} />
                <InputText type="text" defaultValue={leadObj.issuedBy} updateType="issuedBy" containerStyle="mt-1" labelTitle="Nơi cấp" updateFormValue={updateFormValue} />
                <InputText type="text" defaultValue='' updateType="address" containerStyle="mt-1" labelTitle="Địa chỉ thường chú" updateFormValue={updateFormValue} />

                <SelectBox
                    options={position}
                    labelTitle="Chức vụ"
                    placeholder="Lựa chọn chức vụ"
                    containerStyle="mt-1 w-80"
                    defaultValue="2"
                    updateType="position"
                    updateFormValue={updateFormValue}
                />

                <InputFile type="file" labelTitle="Chữ ký" updateType="signature" containerStyle="mt-1" updateFormValue={updateFormValue} />


            </div>


            <div className="divider mt-1"></div>
            <div className="text-xl font-semibold ">TÀI KHOẢN NGÂN HÀNG</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectBankAPI updateFormValue={updateFormValue} updateType="bankCode" />
                <InputText type="number" defaultValue='' updateType="accountNumber" containerStyle="mt-1" labelTitle="Số tài khoản" updateFormValue={updateFormValue} />
                <InputText type="text" defaultValue='' updateType="accountName" containerStyle="mt-1" labelTitle="Tên chủ khoản" updateFormValue={updateFormValue} format="fullName" />
            </div>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Huỷ bỏ</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>Xác nhận</button>
            </div>
        </>
    )
}

export default AddLeadModalBody