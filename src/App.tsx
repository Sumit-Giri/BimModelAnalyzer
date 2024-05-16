
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/landing';
import Viewer from './components/Viewer';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/viewer" element={<Viewer />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

