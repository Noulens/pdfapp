import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from './App';
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from "./components/Login";
import Logout from "./components/Logout";
import Single from "./components/Single";


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Router>
		<React.StrictMode>
			<Header />
				<Routes>
					<Route path="/*" element={<App />} />
					<Route path="/register" element={<Register />}/>
					<Route path="/login" element={<Login />}/>
					<Route path="/logout" element={<Logout />}/>
					<Route path="/post/:slug" element={<Single />} />
				</Routes>
			<Footer />
		</React.StrictMode>
	</Router>
);

