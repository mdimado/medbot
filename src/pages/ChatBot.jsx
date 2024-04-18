import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from "reactstrap";
import "../styles/chatbot.css";
import useAuth from '../custom-hooks/useAuth';
import userIcon from "../assets/images/account-circle-line.png";
import boticon from "../assets/images/eco-logo.png"


const ChatBot = () => {

const { currentUser } = useAuth();
  return (
    <Helmet title={"ChatBot"}>
      <Container className='containerr'>
        <Row className='chatbot'>
          <Col className='patients' lg='3'>
            <div className='patient__button'>New Patient <i class="ri-add-fill"></i></div>
            <div className='patient__search'><input type="text" placeholder='Search Patients' /> <i class="ri-search-line"></i></div>
            <div className="patientnames">
            <div class="patient-info">
    <p class="patient-name">Rajesh Kumar</p>
    <p class="patient-description">Chronic back pain.</p>
    <p class="entry-date">April 10, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Anita Desai</p>
    <p class="patient-description">Knee osteoarthritis.</p>
    <p class="entry-date">April 12, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Vinod Sharma</p>
    <p class="patient-description">Rotator cuff tear.</p>
    <p class="entry-date">April 14, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Priya Singh</p>
    <p class="patient-description">Carpal tunnel syndrome.</p>
    <p class="entry-date">April 16, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Ajay Patel</p>
    <p class="patient-description">Stress injury, wrists.</p>
    <p class="entry-date">April 18, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Sunita Gupta</p>
    <p class="patient-description">Hip dysplasia evaluation.</p>
    <p class="entry-date">April 20, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Manoj Tiwari</p>
    <p class="patient-description">Ankle sprain.</p>
    <p class="entry-date">April 22, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Lakshmi Reddy</p>
    <p class="patient-description">Fractured clavicle.</p>
    <p class="entry-date">April 24, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Harish Joshi</p>
    <p class="patient-description">Elbow bursitis.</p>
    <p class="entry-date">April 26, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Deepa Chatterjee</p>
    <p class="patient-description">Hip replacement follow-up.</p>
    <p class="entry-date">April 28, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Kiran Bhat</p>
    <p class="patient-description">Spinal disc herniation.</p>
    <p class="entry-date">April 30, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Shankar Narayan</p>
    <p class="patient-description">Achilles tendonitis.</p>
    <p class="entry-date">May 2, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Geeta Mahajan</p>
    <p class="patient-description">Wrist fractures.</p>
    <p class="entry-date">May 4, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Rahul Roy</p>
    <p class="patient-description">Shoulder dislocation.</p>
    <p class="entry-date">May 6, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Nisha Kulkarni</p>
    <p class="patient-description">Knee ligament injury.</p>
    <p class="entry-date">May 8, 2024</p>
</div>

<div class="patient-info">
    <p class="patient-name">Arjun Menon</p>
    <p class="patient-description">Lower limb prosthetics.</p>
    <p class="entry-date">May 10, 2024</p>
</div>

            </div>
          </Col>
          <Col lg='9' className='modelcont'>
            <div className="model">
              <div className="doctor_prompt">
                
                <p>I'm facing challenges in managing a case of chronic back pain in a patient. Despite thorough evaluation and treatment attempts, including physical therapy and medication, the pain persists. The patient experiences a constant dull ache localized to the lumbar region, limiting their mobility and affecting their quality of life.</p>
                <div className="cone"></div>
                <img src={currentUser && currentUser.photoURL ? currentUser.photoURL : userIcon} alt="" />
              </div>
              <div className="bot_prompt">
                <img src={boticon} alt="" />
                <p  className='bot_p'><div>
  <p class="bold">Assessment:</p>
  <ul>
    <li>The patient presents with chronic back pain localized to the lumbar region.</li>
    <li>Symptoms are refractory to conventional treatment modalities.</li>
    <li>Limited mobility and functional impairment are noted.</li>
  </ul>
</div>

<div>
  <p class="bold">Recommendations:</p>
  <ol>
    <li>
      <p class="bold">Reassessment:</p>
      <ul>
        <li>Conduct a thorough reassessment of the patient's clinical presentation and imaging studies to identify any overlooked structural abnormalities.</li>
        <li>Consider complementary diagnostic modalities such as electromyography (EMG) or nerve conduction studies to assess for neuropathic or radicular components.</li>
      </ul>
    </li>
    <li>
      <p class="bold">Pain Management:</p>
      <ul>
        <li>Optimize pharmacological interventions with neuropathic pain medications (e.g., gabapentin, pregabalin) or low-dose tricyclic antidepressants tailored to address specific pain mechanisms.</li>
        <li>Explore non-pharmacological approaches such as cognitive-behavioral therapy (CBT), acupuncture, or transcutaneous electrical nerve stimulation (TENS) as adjunctive therapies.</li>
      </ul>
    </li>
    <li>
      <p class="bold">Lifestyle Modifications:</p>
      <ul>
        <li>Promote lifestyle modifications including regular exercise, posture correction, and ergonomic adjustments to alleviate symptoms and prevent future exacerbations.</li>
      </ul>
    </li>
    <li>
      <p class="bold">Collaboration:</p>
      <ul>
        <li>Collaborate with other healthcare professionals such as physical therapists, pain specialists, or spine surgeons to optimize the patient's care plan.</li>
      </ul>
    </li>
  </ol>
</div>

<div>
  <p>A comprehensive and integrative approach to managing the patient's chronic back pain is essential, focusing on accurate diagnosis, tailored treatment strategies, and patient-centered care.</p>
</div>
</p>
                </div>
            </div>
            <div className="input"><input type="text" placeholder='How can I assist you with your patient today?'/><div className="send"><i class="ri-send-plane-fill"></i></div></div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  )
}

export default ChatBot