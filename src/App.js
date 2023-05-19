import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox
} from "@react-google-maps/api";
import "./Map.css";

const MapData = (props) => {
  const [center, setCenter] = useState({ lat: 13.0827, lng: 80.2707 });

  const searchBoxRef = useRef(null);
  const [dt, setDt] = useState("");

  const handleCurrentLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => console.error(error)
    );
  };

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      setCenter({
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng()
      });
    }
  };

  // const districtCoordinates = {
  //   "Thanjavur": { lat: 10.7867, lng: 79.1378 },
  //   "Thiruvarur": { lat: 10.7746, lng: 79.6368 },
  //   "Nagapattinam": { lat: 10.7630, lng: 79.8403 },
  //   "Mayiladuthurai": { lat: 11.1030, lng: 79.6522 },
  //   "Tiruchirapalli": { lat: 10.7905, lng: 78.7047 },
  //   "Ariyalur": { lat: 11.0767, lng: 79.0845 },
  //   "Perambalur": { lat: 11.2346, lng: 78.8683 },
  //   "Karur": { lat: 10.9595, lng: 78.0776 },
  //   "Kancheepuram": { lat: 12.8362, lng: 79.7042 },
  //   "Tiruvallur": { lat: 13.1396, lng: 79.9081 },
  //   "Vellore": { lat: 12.9165, lng: 79.1325 },
  //   "Tiruvannamalai": { lat: 12.2266, lng: 79.0702 },
  //   "Cuddalore": { lat: 11.7447, lng: 79.7693 },
  //   "Villupuram": { lat: 11.9404, lng: 79.4906 },
  //   "Coimbatore": { lat: 11.0168, lng: 76.9558 },
  //   "Tirupur": { lat: 11.1077, lng: 77.3411 },
  //   "Erode": { lat: 11.3428, lng: 77.7274 },
  //   "Salem": { lat: 11.6643, lng: 78.1460 },
  //   "Namakkal": { lat: 11.2187, lng: 78.1670 },
  //   "Nilgiris": { lat: 11.4008, lng: 76.7007 },
  //   "Pudukottai": { lat: 10.3833, lng: 78.8167 },
  //   "Madurai": { lat: 9.9252, lng: 78.1198 },
  //   "Dindigul": { lat: 10.3322, lng: 77.9537 },
  //   "Theni": { lat: 10.0140, lng: 77.4840 },
  //   "Ramanathapuram": { lat: 9.3738, lng: 78.8365 },
  //   "Virudhunagar": { lat: 9.5889, lng: 77.9525 },
  //   "Sivagangai": { lat: 9.8485, lng: 78.4808 },
  //   "Tirunelveli": { lat: 8.7139, lng: 77.7567 },
  //   "Thoothukudi": { lat: 8.8055, lng: 78.1458 },
  //   "Kanyakumari": { lat: 8.0883, lng: 77.5385 },
  //   "Dharmapuri": { lat: 12.1264, lng: 78.1589 },
  //   "Krishnagiri": { lat: 12.516413, lng: 78.213501 },
  //   "Any": { lat: 13.0827, lng: 80.2707 },
  //   "Chennai": { lat: 13.0827, lng: 80.2707 },
  //   "Dindigul (Except Kodaikanal)": { lat: 10.330330, lng: 77.957647 },
  //   "Kodaikanal(Dindugal)": { lat: 10.238114, lng: 77.489182 },
  //   "Tuticorin": { lat: 8.802609, lng: 78.134504 },
  //   "Thirunelveli": { lat: 8.701486, lng: 77.708153 },
  //   "Thiruvannamalai": { lat: 12.231236, lng: 79.069408}
  // }

  // const district = props.passname?props.passname:'Any';

  // setCenter(district);

  const dplaces = {
    Chennai: {
      Intermediatehospitals: 34328,
      Primaryhospitals: 2844,
      Advancedhospitals: 19605,
      lat: 13.0827,
      lng: 80.2707
    },

    Kancheepuram: {
      Intermediatehospitals: 23097,
      Primaryhospitals: 1508,
      Advancedhospitals: 13208,
      lat: 12.8362,
      lng: 79.7042
    },
    Thiruvallur: {
      Intermediatehospitals: 21513,
      Primaryhospitals: 1526,
      Advancedhospitals: 12307,
      lat: 13.1396,
      lng: 79.9081
    }
  };

  const placeChange = (e) => {
    const d = e.target.value;
    setDt(d);
    if (d === "Thiruvallur") {
      setCenter({ lat: 13.1396, lng: 79.9081 });
    }
    if (d === "Kancheepuram") {
      setCenter({ lat: 12.8362, lng: 79.7042 });
    }

    if (d === "Chennai") {
      setCenter({ lat: 13.0827, lng: 80.2707 });
    }
  };

  return (
    <div>
      <div>
        <div id="map-container">
          <LoadScript
            googleMapsApiKey="AIzaSyAsWKn6CuoIEIYnLdY149BXfNrRQWDZOXA"
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%"
              }}
              center={center}
              zoom={10}
              options={{ styles: mapStyles }}
            >
              <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={handlePlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Search location"
                  id="map-search-box"
                />
              </StandaloneSearchBox>
            </GoogleMap>
          </LoadScript>
        </div>
        <div>
          Select a district:
          <select onChange={placeChange}>
            <option value="">-- Select -- </option>
            <option value="Chennai">Chennai</option>
            <option value="Thiruvallur">Thiruvallur</option>
            <option value="Kancheepuram">Kancheepuram</option>
          </select>
          {dt !== "" && (
            <p>
              Advanced hospitals :{dplaces[dt].Advancedhospitals}
              <br />
              Intermediate hospitals :{dplaces[dt].Intermediatehospitals}
              <br />
              Primary hospitals :{dplaces[dt].Primaryhospitals}
              <br />
            </p>
          )}
        </div>
        <button id="map-button1" onClick={handleCurrentLocationClick}>
          Center map on current location
        </button>
      </div>
    </div>
  );
};

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

export default MapData;
