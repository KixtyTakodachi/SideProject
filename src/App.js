import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Themes from './Components/Themes/Themes'
import ThemeItem from './Components/ThemeItem/ThemeItem'
import './App.css'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} /> <Route path="/login" element={<Login />} />
				<Route path="/themes" element={<Themes />} />
				<Route path="/themes/:themeId" element={<ThemeItem />} />
			</Routes>{' '}
		</BrowserRouter>
	)
}
export default App
