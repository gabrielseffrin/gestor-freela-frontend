import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import {PrivateRoute} from "./components/PrivateRoute.tsx";
import RootPage from "./Root/RootPage.tsx";
import Layout from "./_layout.tsx";
import TimeRecord from "./pages/timeRecord";
import ProjectsPage from "@/pages/projects";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<RootPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="timeRecord" element={<TimeRecord />} />
                    <Route path="projects" element={<ProjectsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;