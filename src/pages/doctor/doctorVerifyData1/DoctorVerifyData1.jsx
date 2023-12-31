import React from 'react'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import imgDoc from '../../../assets/doctor_Detail.webp'
import DoctorVerifyForm1 from '../../../components/doctorHomeNav/doctorVerifyForms/DoctorVerifyForm1'

function DoctorVerifyData1() {
  const [open, setOpen] = React.useState(true); 

  const handleSidenav = () => {
    setOpen(!open);
  };
  return (
    <div>
    <div>
      <DoctorNavBar />
    </div>
    <div className='flex gap-0 p-0'>
      <div className='m-0 bg-green gap-0'>
        <DoctorSideNav  handleSidenav={handleSidenav}/>
      </div>
      <div className='flex-1'>
        <div className='flex-1 gap-0 text-2xl font-serif font-bold h-24  justify-center pt-8 m-0 px-6 bg-grey-shade shadow-sm w-full'>{'Profile'}</div>
        <div className='flex flex-1 m-0 pt-10 px-10 '>
          <div className='flex-1 w-1/3'>
            <DoctorVerifyForm1 />
          </div>
          <div className='flex-1 w-2/3 m-0 p-0'>
            <img
              src={`${imgDoc}?w=164&h=164&fit=crop&auto=format`}
              alt={'title'}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  

  )
}

export default DoctorVerifyData1
