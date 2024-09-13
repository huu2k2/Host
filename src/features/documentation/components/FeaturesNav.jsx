import { useState } from "react"

function FeaturesNav({activeIndex}){

    const SECTION_NAVS = [
        {name : "Authentication", isActived : activeIndex === 1 ? true : false},
        {name : "Sidebar", isActived : false},
        {name : "Add New Page", isActived : false},
        {name : "Right sidebar", isActived : false},
        {name : "Themes", isActived : false},
        {name : "Modal", isActived : false},
        {name : "Notification", isActived : false},
    ]
    const [navs, setNavs] = useState(SECTION_NAVS)

    const scrollToSection = (currentIndex) => {
        setNavs(navs.map((n, k) => {
            if(k === currentIndex)return {...n, isActived : true}
            else return {...n, isActived : false}
        }))
        document.getElementById('feature'+(currentIndex+1)).scrollIntoView({behavior: 'smooth' })
    }

    return(
        <ul className="menu w-56 mt-10 text-sm">
            <li className="menu-title"><span className="">Features</span></li>
            
            {
                navs.map((n, k) => {
                    return(
                        <li key={k} onClick={() => scrollToSection(k)} className={n.isActived ? "bordered" : ""}><a>{n.name}</a></li>
                    )
                })
            }
        </ul>
    )
}

export default FeaturesNav