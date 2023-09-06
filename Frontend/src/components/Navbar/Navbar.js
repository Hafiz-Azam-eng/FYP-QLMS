
import React, { Fragment, useEffect } from 'react';
import './navbar.css'
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth';
import { getCurrentProfileUser } from '../../redux/actions/profile';

import { Link, useLocation } from "react-router-dom"
import Azam from "../img/Azam.jpg"
import a from "../img/WhatsApp Image 2023-08-01 at 06.50.49.jpeg"
// import CustomButton from '../CustomButton/CustomButton'

const Navbar = ({ getCurrentProfileUser, auth: { isAuthenticated }, logout, profile, user }) => {

    useEffect(() => {
        getCurrentProfileUser();
    }, [getCurrentProfileUser]);


    // console.log(profile.profile.user.profilepicture);




    const [toggle, setToggle] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownVisible((prevState) => !prevState);
    };
    const location = useLocation();

    const authLinks = (
        <div className='bg-white'>
            <div className='max-w-[1240px] px-[15px] py-[15px] items-center flex justify-between mx-auto'>
                <div className='flex items-center gap-10'>
                    {toggle ?
                        <AiOutlineMenu onClick={() => setToggle(!toggle)} className='text-black text-2xl md:hidden block' />
                        :
                        <AiOutlineClose onClick={() => setToggle(!toggle)} className='text-black text-2xl md:hidden block' />
                    }
                    <div className='text-3xl font-bold text-[#00A86B]'>
                        Quran LMS
                        {/* <img className="w-28 h-28" src={a} alt="" onClick={toggleDropdown} /> */}
                    </div>
                    <ui className='hidden md:flex text-gray-700 gap-10 list-none text-xl'>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/courses">
                                <i className="fas fa-user" />{' '}
                                <span className="hide-sm">Courses</span>
                            </Link>

                        </li>
                        <li>
                            <Link to="/enrolledCourses">
                                <i className="fas fa-user" />{' '}
                                <span className="hide-sm">Enrolled Courses</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts">Posts</Link>
                        </li>
                        <Link to="/dashboard">
                            <li>DashBoard</li>
                        </Link>
                        {/* <Link to="/profiles">
                            <li>Users</li>
                        </Link> */}
                    </ui>

                    {/* Responsive menu */}

                    <ui className={` duration-300 md:hidden fixed text-start bg-black z-40 text-white top-[70px] w-full h-screen list-none 
           ${toggle ? 'left-[-100%]' : 'left-[0]'}`}>
                        <li className='p-5'>Home</li>
                        <li>
                            <Link to="/courses">
                                <i className="fas fa-user" />{' '}
                                <span className="hide-sm">Courses</span>
                            </Link>
                        </li>
                        <li className='p-5'>Contact</li>
                        <Link to="/dashboard">
                            <li>DashBoard</li>
                        </Link>
                        {/* <Link to="/profiles"><li>Users</li></Link> */}
                    </ui>
                </div>


                <div className="flex flex-col items-center space-x-4">
                    <img className="w-10 h-10 rounded-full" src={profile?.profile?.user?.profilepicture} alt="" onClick={toggleDropdown} />
                    <div className="font-medium dark:text-white">
                        {/* Add content for the profile page */}
                    </div>
                    {isDropdownVisible && (
                        <div className="absolute bg-white rounded-md shadow-lg z-10 mt-10">
                            {/* Add your buttons here */}
                            <Link to={`/profile`}>
                                <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-40">Profile</button>
                            </Link>

                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-40">Button 2</button>
                            <Link to="/create-profile" className="btn btn-primary my-1">
                                
                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-40">Edit Profile</button>
                            </Link>
                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-40" onClick={logout}>LogOut</button>
                        </div>
                    )}
                </div>



            </div>
        </div>
    );

    const guestLinks = (
        <div className='bg-white'>
            <div className='max-w-[1240px] px-[15px] py-[15px] items-center flex justify-between mx-auto'>
                <div className='flex items-center gap-10'>
                    {toggle ?
                        <AiOutlineMenu onClick={() => setToggle(!toggle)} className='text-black text-2xl md:hidden block' />
                        :
                        <AiOutlineClose onClick={() => setToggle(!toggle)} className='text-black text-2xl md:hidden block' />
                    }
                    <div className='text-3xl font-bold text-[#00A86B]'>
                        Quran LMS
                    </div>
                    <ui className='hidden md:flex text-gray-700 gap-10 list-none text-xl'>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>About</li>
                        <li>Contact</li>
                        <Link to="/dashboard">
                            <li>DashBoard</li>
                        </Link>
                    </ui>

                    {/* Responsive menu */}

                    <ui className={` duration-300 md:hidden fixed text-start bg-black z-40 text-white top-[70px] w-full h-screen list-none 
           ${toggle ? 'left-[-100%]' : 'left-[0]'}`}>
                        <li className='p-5'>Home</li>
                        <li className='p-5'>About</li>
                        <li className='p-5'>Contact</li>
                        <Link to="/dashboard">
                            <li>DashBoard</li>
                        </Link>
                    </ui>
                </div>

                {location.pathname === '/Registration' ? (
                    <button className='flex flex-row bg-white text-[#414141] font-bold py-2 px-4'>
                        <Link to='/Login'>Login</Link>
                        <li>
                            <Link to="/instructorlogin">Instrcutor</Link>
                        </li>
                    </button>
                ) : (
                    <button className='flex flex-row bg-white text-[#414141] font-bold py-2 px-4'>
                        <Link to='/Registration'>Signup</Link>
                        <li>
                            <Link to="/instructorlogin">Instrcutor</Link>
                        </li>
                    </button>

                )}


            </div>
        </div>
    );


    return (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    getCurrentProfileUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { logout, getCurrentProfileUser })(Navbar);