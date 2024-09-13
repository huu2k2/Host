import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import { CreateHome } from '../../features/createHome'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Quản lý nhà", title2: "Thêm nhà mới" }))
    }, [])


    return (
        <CreateHome />
    )
}

export default InternalPage