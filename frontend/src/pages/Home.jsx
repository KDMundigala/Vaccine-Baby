import React from 'react';
import Navbar from '../components/navbar.jsx';
import Heropage from '../components/landingpage.jsx';
import Sectionone from '../components/sectionone.jsx';
import Sectiontwo from '../components/sectiontwo.jsx';
import Sectionthree from '../components/sectionthree.jsx';
import Sectionfour from '../components/sectionfour.jsx';
import Footer from  '../components/footer.jsx';

const Home = () => {
    return (
        <>
            <Navbar />
            <Heropage />
            <Sectionone/>
            <Sectiontwo/>
            <Sectionthree/>
            <Sectionfour/>
            <Footer/>

           
            
        </>
    );
};

export default Home;