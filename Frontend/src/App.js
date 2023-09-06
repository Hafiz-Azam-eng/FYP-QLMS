
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import './App.css';
import Card from './components/Cards/Card';
import Dropdown from './components/Dropdown/Dropdown';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Reading from './components/Reading/Reading';
import Alert from "./components/layout/Alert";

import Home from './pages/Home';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import '../src/constants/fonts.css'
import ProfilePage from "./pages/ProfilePage";
import { LOGOUT } from './redux/const';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import { loadInstructor } from './redux/actions/auth';
import setAuthToken from './redux/utils/setAuthToken';
import { Provider } from 'react-redux';
import Profiles from './components/profiles/Profiles';
import PrivateRoute from './components/routing/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import ProfileFormPage from './pages/ProfileFormPage';
import AddExperiencePage from './pages/AddExperiencePage';
import AddEducationPage from './pages/AddEducationPage';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import InstructorLoginPage from './pages/InstructorLoginPage';
import InstructorDashboardPage from './pages/InstructorDashboardPage';
import AddCoursePage from './pages/AddCoursePage';
import InstructorCoursesPage from './pages/InstructorCoursesPage';
import InstructorAssignments from './components/instructor/InstructorAssignments';
import InstructorAssignmentsPage from './pages/InstructorAssignmentPage';
import InstructorAnnouncementPage from './pages/InstructorAnnouncmentPage';
import CoursesListPage from './pages/CourseListPage';
import EnrolledCoursesPage from './pages/EnrolledCoursesPage';
import AnnouncementPage from './pages/AnnouncmentPage';
import Assignments from './components/courses/Assignments';
import AssignmentsPage from './pages/AssignmentsPage';
import AddInstructorEducation from './components/profile-forms/AddInstructorEducation';
import AddInstructorEducationPage from './pages/AddInstructorEducationPage';
import AddInstructorExperiencePage from './pages/AddInstructorExperiencePage';
import QuizListPage from './pages/QuizListPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import AddQuizPage from './pages/AddQuizPage';
import EmailVerifyPage from './pages/EmailVerifyPage';
import QuizResultPage from './pages/QuizResultPage';
import courseContentPageList from './pages/courseContentListPage';
import CourseContentPage from './pages/CourseContentPage';
import AddCourseContentPage from './pages/AddCourseContentPage';
import InstructorCourseAssignments from './components/instructor/InstructorCourseAssignments';
import InstrucotrCourseAssignmentsPage from './pages/InstrucotrCourseAssignmentsPage';
import SubmissionsPage from './pages/SubmissionsPage';
import AssignmentPage from './pages/AssignmentPage';
// import EmailVerify from './components/emailverification/EmailVerify';




function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());
    // store.dispatch(loadInstructor());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <div className="App font-[Opensansfontmedium]">
      <Provider store={store}>
        <Router>
          <Alert />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Reading" element={<Reading />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/instructorlogin" element={<InstructorLoginPage />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/Instructorprofiles" element={<Profiles />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerifyPage />} />
            <Route
              path="dashboard"
              element={<PrivateRoute component={DashboardPage} />}
            />

            <Route
              path="instructorDashboard"
              element={<PrivateRoute component={InstructorDashboardPage} />}
            />
            <Route
              path="instructorcourses"
              element={<PrivateRoute component={InstructorCoursesPage} />}
            />
            <Route
              path="courses/:courseid/instructorassignments"
              element={<PrivateRoute component={InstructorAssignmentsPage} />}
            />
             <Route
              path="courses/:courseid/UploadCourseContent"
              element={<PrivateRoute component={AddCourseContentPage} />}
            />
            <Route
              path="courses/:courseid/addquiz"
              element={<PrivateRoute component={AddQuizPage} />}
            />
            <Route
              path="instructorcourses/:courseid/announcements"
              element={<PrivateRoute component={InstructorAnnouncementPage} />}
            />
            <Route
              path="courses/:courseid/announcements"
              element={<PrivateRoute component={AnnouncementPage} />}
            />
            <Route
              path="courses/:courseid/assignments"
              element={<PrivateRoute component={AssignmentsPage} />}
            />
            <Route
              path="courses/:courseid/:assignmentid/assignment"
              element={<PrivateRoute component={AssignmentPage} />}
            />
             <Route
              path="courses/:courseid/instructorcourseassignments"
              element={<PrivateRoute component={InstrucotrCourseAssignmentsPage} />}
            />
            <Route
              path="/courses/:courseid/assignments/:assignmentid/submissions"
              element={<PrivateRoute component={SubmissionsPage} />}
            />
            <Route
              path="courses/:courseid/quizzes"
              element={<PrivateRoute component={QuizListPage} />}
            />
            <Route
              path="/quizzes/:quizId"
              element={<PrivateRoute component={QuizDetailsPage} />}
            />
            <Route
              path="/quizzres/:quizId"
              element={<PrivateRoute component={QuizResultPage} />}
            />
            <Route
              path="courses"
              element={<PrivateRoute component={CoursesListPage} />}
            />
            <Route
              path="create-profile"
              element={<PrivateRoute component={ProfileFormPage} />}
            />
            <Route
              path="enrolledCourses"
              element={<PrivateRoute component={EnrolledCoursesPage} />}
            />

            <Route
              path="edit-profile"
              element={<PrivateRoute component={ProfileFormPage} />}
            />
            <Route
              path="addcourse"
              element={<PrivateRoute component={AddCoursePage} />}
            />
            <Route
              path="add-experience"
              element={<PrivateRoute component={AddExperiencePage} />}
            />
            <Route
              path="add-Instructor-experience"
              element={<PrivateRoute component={AddInstructorExperiencePage} />}
            />
            <Route
              path="add-Instructor-education"
              element={<PrivateRoute component={AddInstructorEducationPage} />}
            />

            <Route
              path="add-education"
              element={<PrivateRoute component={AddEducationPage} />}
            />
            <Route path="posts" element={<PrivateRoute component={PostsPage} />} />
            <Route path="posts/:id" element={<PrivateRoute component={PostPage} />} />

            <Route
              path="courses/:courseid/content"
              element={<PrivateRoute component={courseContentPageList} />}
            />

            <Route
              path="/courseContent/:contentId"
              element={<PrivateRoute component={CourseContentPage} />}
            />

          </Routes>
        </Router>
      </Provider>


      {/* <Home/> */}
      {/* <Reading/>       */}
      {/* <Dropdown/> */}
    </div>
  );
}

export default App;
