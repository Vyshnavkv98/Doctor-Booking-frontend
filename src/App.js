import './App.css';
import { useState, useEffect } from 'react';

import AdminLogin from './components/adminLogin/AdminLogin';
import { Routes, Route, useNavigate,BrowserRouter as Router } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import LandinPage from './pages/LandinPage';
import { login } from './redux/user';
import { useDispatch } from 'react-redux';
import AdminHome from './pages/AdminHome';
import AdminUserControl from './pages/AdminUserControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Upload from './components/upload/Upload';
import DoctorLogin from './pages/doctor/doctorlogin/DoctorLogin';
import DoctorHomePage from './pages/doctor/doctorHomePage/DoctorHomePage';
import DoctorProfileVerify from './pages/doctor/doctorProfileVerification/DoctorProfileVerify';
import DoctorVerifyData1 from './pages/doctor/doctorVerifyData1/DoctorVerifyData1';
import AdiminDoctorVerify from './pages/AdiminDoctorVerify';
import AdminAddDepartment from './pages/AdminAddDepartment';
import AdminAllDepartmentDetails from './pages/AdminAllDepartmentDetails';
import AdiminDoctorVerification from './pages/AdminDoctorVerification';
import ManageDoctorSlots from './pages/doctor/doctorSlotAppointment/ManageDoctorSlots';
import AnimationWrapper from './animationWrapper/AnimationWrapper';
import DoctorVideoConsultationSlotBooking from './pages/doctor/doctorVideoConsultationSlotBooking/DoctorVideoConsultationSlotBooking';
import DoctorOnlineAppointments from './pages/doctor/doctorOnlineAppointments/DoctorOnlineAppointments';
import DoctorVideoLandingPage from './pages/doctor/doctorVideoLanding/DoctorVideoLandingPage';
import { Suspense } from 'react';
import Loader from './components/loader/Loader';
import DoctorRoomPage from './pages/doctor/doctorRoomPage/DoctorRoomPage';
import DoctorPrescriptionPage from './pages/doctor/doctorPrescription/DoctorPrescriptionPage';
import DoctorSuccess from './components/doctorHomeNav/doctorNav/doctorVideoSuccess/DoctorSuccess';
import MapComponent from './components/doctorHomeNav/mapcomponent/MapComponent';
import DoctorWalletPage from './pages/doctor/doctorWalletPage/DoctorWalletPage';
import Bb from './components/doctorHomeNav/mapcomponent/Bb';




function App() {
  const [relogin, setRelogin] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [adminLoginStatus, setAdminLoginStatus] = useState(false)
  const dispatch = useDispatch(login)







  return (
    <div className="">
      <AppContext.Provider value={{
        relogin: relogin, setRelogin: setRelogin,
        loginStatus: loginStatus,
        setLoginStatus: setLoginStatus,
        adminLoginStatus: adminLoginStatus,
        setAdminLoginStatus: setAdminLoginStatus
      }}>

        
          <AnimationWrapper />
          <Suspense fallback={<Loader />}>
       
        <Routes>
           
          <Route path='/' element={<LandinPage />}></Route>
          <Route path='/admin' element={<AdminLogin />} ></Route>
          <Route path='/admin/dashboard' element={<AdminHome />}></Route>
          <Route path='/admin/usercontrol' element={<AdminUserControl />}></Route>
          <Route path='/admin/doctor-verify' element={<AdiminDoctorVerify />}></Route>
          <Route path='/admin/doctor-verificcation' element={<AdiminDoctorVerification />}></Route>
          <Route path='/admin/add-department' element={<AdminAddDepartment />}></Route>
          <Route path='/admin/departments' element={<AdminAllDepartmentDetails />}></Route>
          <Route path='/mapupload' element={<Upload />}></Route>
       

          <Route path='/doctor-home' element={<DoctorHomePage />}></Route>
          <Route path='/doctor-login' element={<DoctorLogin />}></Route>
          <Route path='/doctor-Profile-verify' element={<DoctorProfileVerify />}></Route>
          <Route path='/Doctor-verify1' element={<DoctorVerifyData1 />}></Route>
          <Route path='/Doctor-manage-slots' element={<ManageDoctorSlots />}></Route>
          <Route path='/Doctor-videocall-manage-slots' element={<DoctorVideoConsultationSlotBooking />}></Route>
          <Route path='/doctor-online-appointment' element={<DoctorOnlineAppointments />}></Route>
          <Route path='/doctor-video-landing' element={<DoctorVideoLandingPage />}></Route>
          <Route path='/doctor-room/:roomid' element={<DoctorRoomPage value={'doctor'} />}></Route>
          <Route path='/doctor-prescription' element={<DoctorPrescriptionPage />}></Route>
          <Route path='/doctor-success' element={<DoctorSuccess value={'doctor'}/>}></Route>
          <Route path='/map' element={<MapComponent />}></Route>
          <Route path='/doctor-wallet' element={<DoctorWalletPage />}></Route>
        </Routes>
        </Suspense>
        <ToastContainer />
      </AppContext.Provider>



    </div >
  );
}

export default App;
