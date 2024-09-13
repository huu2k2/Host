import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import HomeManagement from '../../features/homeManagement'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Quản lý nhà", title2:""}))
      }, [])


    return(
        <HomeManagement />
    )
}

export default InternalPage