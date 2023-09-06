
import React, { Fragment } from 'react';
// import './navbar.css'
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth';
import { Link, useLocation } from "react-router-dom"
import Azam from "../img/Azam.jpg"
import { getCurrentProfile } from '../../redux/actions/profile';

// import CustomButton from '../CustomButton/CustomButton'

const InstructorNavbar = ({getCurrentProfile, auth: { isAuthenticated }, logout,profile }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    const [toggle, setToggle] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownVisible((prevState) => !prevState);
    };
    const location = useLocation();

    const instauthLinks = (
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
                        <Link to="/instructorcourses">
                            {/* <i className="fas fa-user" />{' '} */}
                            <span className="hide-sm">Courses</span>
                        </Link>
                        <Link to="/addcourse">
                            {/* <i className="fas fa-user" />{' '} */}
                            <span className="hide-sm">Add Course</span>
                        </Link>
                        <li>
                            <Link to="/posts">Posts</Link>
                        </li>
                        <Link to="/instructorDashboard">
                            <li>DashBoard</li>
                        </Link>
                        <Link to="/Instructorprofiles">
                            <li>Users</li>
                        </Link>
                    </ui>

                    {/* Responsive menu */}

                    <ui className={` duration-300 md:hidden fixed text-start bg-black z-40 text-white top-[70px] w-full h-screen list-none 
           ${toggle ? 'left-[-100%]' : 'left-[0]'}`}>
                        <li className='p-5'>Home</li>
                        <li className='p-5'>About</li>
                        <li className='p-5'>Contact</li>
                        <Link to="/instructorDashboard">
                            <li>DashBoard</li>
                        </Link>
                        <Link to="/Instructorprofiles"><li>Users</li></Link>
                    </ui>
                </div>


                <div className="flex flex-col items-center space-x-4">
                    <img className="w-10 h-10 rounded-full" src={profile?.profile?.user?.profilepicture} alt="" onClick={toggleDropdown} />
                    <div className="font-medium dark:text-white">
                        {/* Add content for the profile page */}
                    </div>
                    {isDropdownVisible && (
                        <div className="absolute bg-white rounded-md shadow-lg z-10 mt-12">
                            {/* Add your buttons here */}
                            <Link to={`/profile`}>
                                <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-40">Profile</button>
                            </Link>

                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-40">Button 2</button>
                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-40">Edit Profile</button>
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
                        <Link to="/instructorDashboard">
                            <li>DashBoard</li>
                        </Link>
                    </ui>

                    {/* Responsive menu */}

                    <ui className={` duration-300 md:hidden fixed text-start bg-black z-40 text-white top-[70px] w-full h-screen list-none 
           ${toggle ? 'left-[-100%]' : 'left-[0]'}`}>
                        <li className='p-5'>Home</li>
                        <li className='p-5'>About</li>
                        <li className='p-5'>Contact</li>
                        <Link to="/instructorDashboard">
                            <li>DashBoard</li>
                        </Link>
                    </ui>
                </div>

                {location.pathname === '/instructorregister' ? (
                    <button className='bg-white text-[#414141] font-bold py-2 px-4'>
                        <Link to='/Login'>Login</Link>
                        <li>
                            <Link to="/Login">Student</Link>
                        </li>
                    </button>
                ) : (
                    <button className='flex flex-row bg-white text-[#414141] font-bold py-2 px-4'>
                        <Link to='/instructorregister'>Signup</Link>
                        <li>
                            <Link to="/Login">Student</Link>
                        </li>
                    </button>

                )}


            </div>
        </div>
    );


    return (
        <Fragment>{isAuthenticated ? instauthLinks : guestLinks}</Fragment>
    )
}

InstructorNavbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { logout,getCurrentProfile })(InstructorNavbar);