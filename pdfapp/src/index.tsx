import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route, BrowserRouter as Router, Routes, BrowserRouter} from "react-router-dom";
import App from './App';
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/auth/Register'
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Single from "./components/posts/Single";
import Search from "./components/posts/Search";
import Create from "./components/crud/Create";
import Delete from "./components/crud/Delete";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import {ToastContainer} from "react-toastify";


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter >
			<AuthProvider>
				<ToastContainer />
				<Header />
					<Routes>
						<Route path="/register" element={<Register />}/>
						<Route path="/login" element={<Login />}/>
						<Route element={<RequireAuth/>} >
							<Route path="/*" element={<App />} />
							<Route path="/logout" element={<Logout />}/>
							<Route path="/post/:slug" element={<Single />} />
							<Route path="/search" element={<Search />} />
							<Route path="/create" element={<Create />} />
							<Route path="/delete/:id" element={<Delete />} />
						</Route>
					</Routes>
				<Footer />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
