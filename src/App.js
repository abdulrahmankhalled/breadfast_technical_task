import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

import { Header } from "./components/Header/Header";
import { PostDetails } from "./components/PostDetails/PostDetails";
import Home from "./pages/Home";

import "./styles.scss";

export default function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route
						path="/post/:id"
						element={<PostDetails />}
					/>
				</Routes>
			</Router>
		</>
	);
}
