import React,{useState} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from "reactstrap";
import "../styles/chatbot.css";
import useAuth from '../custom-hooks/useAuth';
import userIcon from "../assets/images/account-circle-line.png";
import boticon from "../assets/images/eco-logo.png"


const ChatBot = () => {

const { currentUser } = useAuth();
const [inputValue, setInputValue] = useState('');

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

  return (
    <Helmet title={"ChatBot"}>
      <Container className='containerr'>
        <Row className='chatbot'>
          <Col className='patients' lg='3'>
            <div className='patient__button'>New Patient <i class="ri-add-fill"></i></div>
            <div className='patient__search'><input type="text" placeholder='Search Patients' /> <i class="ri-search-line"></i></div>
            <div className="patientnames">
           

            </div>
          </Col>
          <Col lg='9' className='modelcont'>
            <div className="model">
             
            </div>
            <div className="input">
              <input 
                type="text" 
                placeholder='How can I assist you with your patient today?'
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className={`send ${inputValue ? 'active' : ''}`}>
                <i className="planee ri-send-plane-fill"></i>
              </div>
            </div>
             </Col>
        </Row>
      </Container>
    </Helmet>
  )
}

export default ChatBot