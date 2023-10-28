// import React, { useRef, useState } from 'react';
// function Upload() {
  
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [locationDetails, setLocationDetails] = useState({ name: '', description: '' });

//   const handleClick = (e) => {
//     const { lat, lng } = e.latlng;
//     setMarkerPosition([lat, lng]);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLocationDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

//   const handleSave = () => {
//     // You can send `locationDetails` to your backend API to store in your database
//     // Example API call:
//     // fetch('/api/saveLocation', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ ...locationDetails, position: markerPosition }),
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     // })
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     console.log('Location saved:', data);
//     //   })
//     //   .catch((error) => {
//     //     console.error('Error saving location:', error);
//     //   });
//     console.log('Location details to be saved:', locationDetails, 'Position:', markerPosition);
//   };

//   return (
//     <div>
//       <MapContainer
//         center={[51.505, -0.09]} // Initial center coordinates
//         zoom={13}
//         style={{ height: '800px', width: '100%' }}
//         onClick={handleClick} // Add the click event listener to the map itself
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {markerPosition && <Marker position={markerPosition} />}
//       </MapContainer>

//       {markerPosition && (
//         <div>
//           <h2>Location Details</h2>
//           <form>
//             <div>
//               <label htmlFor="name">Name: </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={locationDetails.name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="description">Description: </label>
//               <input
//                 type="text"
//                 id="description"
//                 name="description"
//                 value={locationDetails.description}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </form>
//           <button onClick={handleSave}>Save Location</button>
//         </div>
//       )}
//     </div>
//   );
  
// }

// export default Upload
