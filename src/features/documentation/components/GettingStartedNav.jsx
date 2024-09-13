import { useState } from "react"

function GettingStartedNav({activeIndex}){

    const SECTION_NAVS = [
        {name : "Introduction", isActived : activeIndex === 1 ? true : false},
        {name : "How to Use", isActived : false},
        {name : "Tailwind CSS", isActived : false},
        {name : "Daisy UI", isActived : false},
        {name : "Chart JS", isActived : false},
        {name : "Redux Toolkit", isActived : false},
        {name : "Hero Icons", isActived : false},
        {name : "Project Structure", isActived : false},
    ]
    const [navs, setNavs] = useState(SECTION_NAVS)

    const scrollToSection = (currentIndex) => {
        setNavs(navs.map((n, k) => {
            if(k === currentIndex)return {...n, isActived : true}
            else return {...n, isActived : false}
        }))
        document.getElementById('getstarted'+(currentIndex+1)).scrollIntoView({behavior: 'smooth' })
    }

    return(
        <ul className="menu w-56 mt-10 text-sm">
            <li className="menu-title"><span className="">Getting Started</span></li>
            
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

export default GettingStartedNav