import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import {PuffLoader} from 'react-spinners'
import PropertyModal from "../viewProperty/PropertyModal";
import CalendarModal from "../viewProperty/CalendarModal";
import BookingSuccessModal from "../viewProperty/BookingSuccessModal";
import {truncate} from 'lodash'
import Heart from "../Heart/Heart";
import { useNavigate } from "react-router-dom";

const Residencies = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const {data, isError, isLoading} = useProperties()

  // Convert data to PropertyPage format for modals
  const convertToPropertyPageFormat = (card) => {
    return {
      id: card.id,
      name: card.title,
      place: card.place,
      price: `₹${card.price}`,
      image: card.image,
      description: card.description,
      reviews: 4.5, // Default values since not in original data
      bedrooms: 3,
      bathrooms: 2,
      interior: 'Modern',
      washroomType: 'Attached',
      bedType: 'King',
      ground: 'Private parking'
    };
  };

  const handleCardClick = (card) => {
    // Navigate to PropertyPage with the property ID as URL parameter
    navigate(`/view-property?propertyId=${card.id}`);
  };

  const handleModalClose = () => setSelectedProperty(null);
  
  const handleBook = () => {
    setShowCalendar(true);
  };
  
  const handleCalendarClose = () => setShowCalendar(false);
  
  const handleConfirm = (date, slot) => {
    setAppointment({ date, slot, property: selectedProperty });
    setShowCalendar(false);
    setSelectedProperty(null);
    setShowSuccess(true);
  };
  
  const handleSuccessClose = () => setShowSuccess(false);

  if(isError){
    return(
      <div className='wrapper'>
        <span>Error while fetching data</span>
      </div>
    )
  }

  if(isLoading){
    return(
      <div className="wrapper flexCenter" style={{height: "60vh"}}>
        <PuffLoader
        height="80"
        width="80"
        radius={1}
        color="#4066ff"
        aria-label="puff-loading"
        />
      </div>
    )
  }


  return (
    <div id="residencies" className="r-wrapper" style={{ backgroundColor: 'white' }}>
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>
        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {/* slider */}
          {data.slice(0, 8).map((card, i) => (
            <SwiperSlide key={i}>
              <div onClick={() => handleCardClick(card)}>
                <ResidencyPropertyCard card={card}/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Residencies;

// Custom PropertyCard for Residencies that doesn't navigate
const ResidencyPropertyCard = ({card}) => {
  return (
    <div className="flexColStart r-card" style={{ cursor: 'pointer' }}>
      <Heart id={card?.id}/>
      <img src={card.image} alt="home" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>₹</span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">{truncate(card.title, {length: 15})}</span>
      <span className="secondaryText">{truncate(card.description, {length: 80})}</span>
    </div>
  );
};

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
