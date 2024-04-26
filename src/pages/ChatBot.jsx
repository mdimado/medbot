import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from "reactstrap";
import "../styles/chatbot.css";
import { auth, db } from '../firebase.config'; 
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import PatientForm from '../components/Patientform'; 
import PatientInfo from '../components/PatientInfo'; // Import the PatientInfo component
import { doc } from 'firebase/firestore';

const ChatBot = () => {
  const [doctorName, setDoctorName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [patientNames, setPatientNames] = useState([]);
  const [filteredPatientNames, setFilteredPatientNames] = useState([]); // State to hold filtered patient names
  const [selectedPatient, setSelectedPatient] = useState(null); // State to hold the selected patient's name
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setDoctorName('Dr. ' + user.displayName || 'No name set');
  
        try {
          // Reference to the doctor's document in the "doctors" collection
          const doctorRef = doc(db, 'doctors', user.uid);
          // Reference to the nested "patients" collection within the doctor's document
          const patientsRef = collection(doctorRef, 'patients');
          // Query the nested "patients" collection to get patient names
          const snapshot = await getDocs(patientsRef);
  
          const names = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            if (data && data.name && data.createdAt) {
              names.push({ name: data.name, createdAt: data.createdAt });
            }
          });
  
          // Sort names based on createdAt timestamp
          names.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  
          setPatientNames(names.map(name => name.name)); // Setting only the names to state
          setFilteredPatientNames(names.map(name => name.name)); // Initialize filtered patient names
          setLoading(false); // Set loading to false after fetching data
        } catch (error) {
          console.error("Error fetching patient names:", error);
          setLoading(false); // Set loading to false in case of error
        }
      } else {
        setDoctorName('Dr. User');
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  

  const fetchPatientNames = async () => {
    try {
      const patientsRef = collection(db, 'patients');
      const snapshot = await getDocs(patientsRef);
      const names = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data && data.name && data.createdAt) {
          names.push({ name: data.name, createdAt: data.createdAt });
        }
      });
      // Sort names based on createdAt timestamp
      names.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);  // Assuming createdAt is a Timestamp object
      setPatientNames(names.map(name => name.name));  // Setting only the names to state
      setFilteredPatientNames(names.map(name => name.name)); // Initialize filtered patient names
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching patient names:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredNames = patientNames.filter(name => name.toLowerCase().includes(searchTerm));
    setFilteredPatientNames(filteredNames);
  };

  const handleNewPatientClick = () => {
    setShowForm(true);
  };
  
  const refetchPatientNames = () => {
    setLoading(true); // Set loading to true before refetching patient names
    fetchPatientNames();
  };

  const handlePatientNameClick = async (name) => {
    try {
      const patientsRef = collection(db, 'patients');
      const querySnapshot = await getDocs(patientsRef);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data && data.name === name) {
          setSelectedPatient(doc.id); // Pass the patient's ID to the setSelectedPatient
          setShowForm(false); // Close the form when a patient's name is clicked
        }
      });
    } catch (error) {
      console.error("Error fetching patient ID:", error);
    }
  };
  
  return (
    <Helmet title={"ChatBot"}>
      <Container className='containerr'>
        <Row className='chatbot'>
          <Col className='patients' lg='3'>
            <div className='patient__button' onClick={handleNewPatientClick}>New Patient <i className="ri-add-fill"></i></div>
            <div className='patient__search'><input type="text" placeholder='Search Patients' onChange={handleSearchChange} /> <i className="ri-search-line"></i></div>
            <div className="patientnames">
              <div className="line"></div>
              {loading ? (
                <p>No patient list found</p>
              ) : filteredPatientNames.length > 0 ? (
                filteredPatientNames.map((name, index) => (
                  <p className='patientname' onClick={() => handlePatientNameClick(name)} key={index}>{name}</p>
                ))
              ) : (
                <p>No patients found.</p>
              )}
            </div>
            <div className="doctorname">
              <p>{doctorName}</p>
            </div>
          </Col>
          <Col lg='9'>
            {showForm ? (
              <div className="modelcont">
                <div className="model">
                  <PatientForm doctorName={doctorName} setShowForm={setShowForm} refetchPatientNames={refetchPatientNames} />
                </div>
              </div>
            ) : (
              selectedPatient && <div className='model posfix'><PatientInfo doctorName={doctorName} setShowForm={setShowForm} patientName={selectedPatient} />
              </div>
            )}
            {!showForm && (
              <div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};  

export default ChatBot;
