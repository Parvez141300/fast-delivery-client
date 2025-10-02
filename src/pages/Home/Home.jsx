import React from 'react';
import Banner from './shared/Banner/Banner';
import DeliverySystem from './shared/DeliverySystem/DeliverySystem';

const Home = () => {
    return (
        <div className='space-y-8'>
            {/* banner */}
            <Banner></Banner>
            {/* delivery systems */}
            <DeliverySystem></DeliverySystem>
        </div>
    );
};

export default Home;