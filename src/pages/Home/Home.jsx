import React from 'react';
import Banner from './shared/Banner/Banner';
import DeliverySystem from './shared/DeliverySystem/DeliverySystem';
import OurServices from './shared/OurServices/OurServices';
import Brands from './shared/Brands/Brands';
import Benefits from './shared/Benefits/Benefits';

const Home = () => {
    return (
        <div className='space-y-12'>
            {/* banner */}
            <Banner></Banner>
            {/* delivery systems */}
            <DeliverySystem></DeliverySystem>
            {/* our services */}
            <OurServices></OurServices>
            {/* brands */}
            <Brands></Brands>
            {/* benefits */}
            <Benefits></Benefits>
        </div>
    );
};

export default Home;