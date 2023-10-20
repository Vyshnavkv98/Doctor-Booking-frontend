import React from 'react'
import DoctorLoginComponent from '../../../components/doctorHomeNav/doctorlogin/DoctorLogin'

function DoctorLogin() {
  const [open, setOpen] = React.useState(true); 

  const handleSidenav = () => {
    setOpen(!open);
  };
  return (
    <div className='bg-white'>
      <DoctorLoginComponent  handleSidenav={handleSidenav}/>
    </div>
  )
}

export default DoctorLogin
