import React, { useState } from 'react';
import routes from '../routes/sidebar';
import { NavLink, Link, useLocation } from 'react-router-dom';
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { useDispatch } from 'react-redux';

function LeftSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="drawer-side ">
            <div className={` ${isSidebarVisible ? 'translate-x-[256px]' : 'translate-x-[-0px]'} transition ml-2 z-50 top-[-20px] left-3 mt-4 mr-2 absolute`}>
                <button

                    className={`py-2 px-4 bg-rose-600 z-50 rounded   left-0 mt-4 mr-2 text-white `}

                    onClick={toggleSidebar}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className={`menu pt-2 w-64 bg-zinc-900 text-white transition ${isSidebarVisible ? '' : 'w-0'}`}>
                <li className="mb-2 font-semibold text-xl">
                    <Link to={'/app/welcome'}>
                        <img className="w-100 pr-20" src="/logo192.png" alt="Aloper Logo" />
                    </Link>
                </li>
                {routes.map((route, k) => (
                    <li className="" key={k}>
                        {route.submenu ? (
                            <SidebarSubmenu {...route} />
                        ) : (
                            <NavLink
                                end
                                to={route.path}
                                className={({ isActive }) =>
                                    `${isActive ? 'font-semibold bg-zinc-600 mx-3 rounded-md' : 'font-normal mx-3 focus:bg-rose-600'}`
                                }
                            >
                                {route.icon} {route.name}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeftSidebar;
