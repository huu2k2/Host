import { useState } from "react"

function DocComponentsNav({activeIndex}){

    const SECTION_NAVS = [
        {name : "Typography", isActived : activeIndex === 1 ? true : false},
        {name : "Form Input", isActived : false},
        {name : "Cards", isActived : false},
    ]
    const [navs, setNavs] = useState(SECTION_NAVS)

    const scrollToSection = (currentIndex) => {
        setNavs(navs.map((n, k) => {
            if(k === currentIndex)return {...n, isActived : true}
            else return {...n, isActived : false}
        }))
        document.getElementById('component'+(currentIndex+1)).scrollIntoView({behavior: 'smooth' })
    }

    return(
        <ul className="menu w-56 mt-10 text-sm">
            <li className="menu-title"><span className="">Components</span></li>
            
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

export default DocComponentsNav