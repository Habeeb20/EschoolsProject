



import React, { useState } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  margin: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  box-sizing: border-box;
  border-top: 5px solid #${props => props.color || '000'};

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    padding: 10px;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #${props => props.color || '000'};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ContentWrapper = styled.div`
  font-size: 1.5rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.0rem;
  }
`;

const GridWrapper = styled.div`
  display: grid;
 
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  justify-content: center;

  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  
  }
`;

const details = [
  { id: 1, title: "23441", subTitle: "Jobs", icon: <FaSuitcase />, color: 'FF6B6B' },
  { id: 2, title: "1220", subTitle: "Schools", icon: <FaBuilding />, color: '4ECDC4' },
  { id: 3, title: "200", subTitle: "Groups", icon: <FaUsers />, color: '1A535C' },
  { id: 4, title: "1761", subTitle: "Users", icon: <FaUserPlus />, color: 'FF6B6B' },
  { id: 5, title: "1500", subTitle: "Students", icon: <FaUsers />, color: 'FF9F1C' },
  { id: 6, title: "800", subTitle: "Teachers", icon: <FaSuitcase />, color: '4ECDC4' },
  { id: 7, title: "450", subTitle: "Exams", icon: <FaBuilding />, color: '1A535C' },
  { id: 8, title: "3000", subTitle: "Training", icon: <FaUserPlus />, color: 'FF9F1C' },
];

const Number = () => {
  const [revealed, setRevealed] = useState(
    details.reduce((acc, detail) => {
      acc[detail.id] = false;
      return acc;
    }, {})
  );

  const handleReveal = (id) => {
    setRevealed((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="heroSection">
      <GridWrapper>
        {details.map((element) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: element.id * 0.1 }}
            onViewportEnter={() => handleReveal(element.id)}
          >
            <Card color={element.color}>
              <IconWrapper color={element.color}>{element.icon}</IconWrapper>
              <ContentWrapper>
                {revealed[element.id] && (
                  <CountUp
                    start={0}
                    end={parseInt(element.title)}
                    duration={3.75}
                    separator=","
                  />
                )}
                <p style={{ marginTop: "10px", fontSize: "1rem" }}>{element.subTitle}</p>
              </ContentWrapper>
            </Card>
          </motion.div>
        ))}
      </GridWrapper>
    </div>
  );
};

export default Number;
