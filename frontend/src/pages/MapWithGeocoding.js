// import React, { useState, useEffect } from 'react';

// const MapWithGeocoding = () => {
//   const [address, setAddress] = useState('Airoli, Navimumbai');
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [geocoder, setGeocoder] = useState(null);
//   const [locationSelected, setLocationSelected] = useState(false);
//   let map;

//   useEffect(() => {
//     if (window.google && !mapLoaded) {
//       initializeMap();
//     }
//   }, [mapLoaded]);

//   const initializeMap = () => {
//     const google = window.google;
//     const geocoder = new google.maps.Geocoder();
//     const latlng = new google.maps.LatLng(19.1590, 72.9986);
//     const mapOptions = {
//       zoom: 8,
//       center: latlng,
//     };
//     map = new google.maps.Map(document.getElementById('map'), mapOptions);
//     const newMarker = new google.maps.Marker({
//       position: latlng,
//       map: map,
//       draggable: !locationSelected,
//       icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
//     });

//     newMarker.addListener('dragend', function () {
//       if (!locationSelected) {
//         geocoder.geocode({ 'location': newMarker.getPosition() }, function (results, status) {
//           if (status === 'OK') {
//             if (results[0]) {
//               setAddress(results[0].formatted_address);
//             }
//           } else {
//             console.error('Cannot determine address at this location.');
//           }
//         });
//       }
//     });

//     setGeocoder(geocoder);
//     setSelectedMarker(newMarker);
//     setMapLoaded(true);
//   };

//   const codeAddress = () => {
//     const google = window.google;
//     const geocoder = new google.maps.Geocoder();

//     if (selectedMarker) {
//       selectedMarker.setMap(null);
//     }

//     geocoder.geocode({ 'address': address }, (results, status) => {
//       if (status === 'OK') {
//         map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 14,
//           center: results[0].geometry.location,
//         });
//         const selectedMarker = new google.maps.Marker({
//           position: results[0].geometry.location,
//           map: map,
//           draggable: false,
//           icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
//         });

//         setLocationSelected(true);

//         performNearbySearch(results[0].geometry.location, ['hospital', 'school', 'university', 'Railway_Station', 'college']);

//         const circle = new google.maps.Circle({
//           strokeColor: "#FF0000",
//           strokeOpacity: 0.8,
//           strokeWeight: 2,
//           fillColor: "#FF0000",
//           fillOpacity: 0.35,
//           map: map,
//           center: results[0].geometry.location,
//           radius: 500
//         });

//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   };

//   const performNearbySearch = (location, types) => {
//     const google = window.google;
//     types.forEach(type => {
//       const request = {
//         location: location,
//         radius: '500',
//         type: [type],
//       };
//       const service = new google.maps.places.PlacesService(map);
//       service.nearbySearch(request, (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//           results.forEach(place => {
//             createMarker(place, type);
//           });
//         }
//       });
//     });
//   };

//   const createMarker = (place, type) => {
//     const google = window.google;
//     let iconUrl;
//     switch (type) {
//       case 'hospital':
//         iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
//         break;
//       case 'school':
//       case 'college':
//       case 'university':
//         iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
//         break;
//       case 'Railway_Station':
//         iconUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
//         break;
//       default:
//         iconUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
//     }
//     const marker = new google.maps.Marker({
//       position: place.geometry.location,
//       map: map,
//       title: place.name,
//       icon: iconUrl
//     });
//   };

//   return window.google ? (
//     <div>
//       <div id="map" style={{ width: '100%', height: '400px' }}></div>
//       <div>
//         <input
//           className='my-2'
//           type="textbox"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           disabled={locationSelected}
//         />
//         <button onClick={codeAddress} disabled={locationSelected} className='mx-2 btn btn-dark'>Submit Location</button>
//       </div>
//     </div>
//   ) : (
//     <p>Loading...</p>
//   );
// };

// export default MapWithGeocoding;






import React, { useState, useEffect } from 'react';

const MapWithGeocoding = () => {
  const [address, setAddress] = useState('Airoli, Navimumbai');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [locationSelected, setLocationSelected] = useState(false);
  let map;

  useEffect(() => {
    if (window.google && !mapLoaded) {
      initializeMap();
    }
  }, [mapLoaded]);

  const initializeMap = () => {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(19.1590, 72.9986);
    const mapOptions = {
      zoom: 8,
      center: latlng,
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const newMarker = new google.maps.Marker({
      position: latlng,
      map: map,
      draggable: !locationSelected,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });

    newMarker.addListener('dragend', function () {
      if (!locationSelected) {
        geocoder.geocode({ 'location': newMarker.getPosition() }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              setAddress(results[0].formatted_address);
            }
          } else {
            console.error('Cannot determine address at this location.');
          }
        });
      }
    });

    setGeocoder(geocoder);
    setSelectedMarker(newMarker);
    setMapLoaded(true);
  };

  const codeAddress = () => {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();

    if (selectedMarker) {
      selectedMarker.setMap(null);
    }

    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: results[0].geometry.location,
        });
        const selectedMarker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          draggable: false,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });

        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
        setLocationSelected(true);

        performNearbySearch(results[0].geometry.location, ['hospital', 'school', 'university', 'Railway_Station', 'college']);

        const circle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map: map,
          center: results[0].geometry.location,
          radius: 500
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const performNearbySearch = (location, types) => {
    const google = window.google;
    types.forEach(type => {
      const request = {
        location: location,
        radius: '500',
        type: [type],
      };
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach(place => {
            createMarker(place, type);
          });
        }
      });
    });
  };

  const createMarker = (place, type) => {
    const google = window.google;
    let iconUrl;
    switch (type) {
      case 'hospital':
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        break;
      case 'school':
      case 'college':
      case 'university':
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        break;
      case 'Railway_Station':
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        break;
      default:
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    }
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
      icon: iconUrl
    });
  };

  return window.google ? (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div>
        <input
          className='my-2'
          type="textbox"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={locationSelected}
        />
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <button onClick={codeAddress} disabled={locationSelected} className='mx-2 btn btn-dark'>Submit Location</button>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default MapWithGeocoding;
