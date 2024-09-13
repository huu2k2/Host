import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import {Link} from 'react-router-dom'
import  TemplatePointers  from '../../features/user/components/TemplatePointers'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : ""}))
        if(localStorage.getItem("token")?.split('.')?.length!==3){
            window.location.href('/login')
        }
      }, [])

    return(
      <div className="hero h-4/5 bg-base-200">
      <div className="hero-content">
        <div className="max-w-md">
            
            <Link to="/app/dashboard"><button className="btn bg-base-100 btn-outline">Get Started</button></Link>
        </div>
      </div>
    </div>
    )
}

export default InternalPage