import React from 'react';
import HomeContent from '../../components/contentHome';
import Footer from '../../components/footer/index';
import NavBar from '../../components/navbar/index';
import './index.css';
export default function Home() {
    return<>
        <NavBar />
        <HomeContent />
        <Footer />
    </>
}