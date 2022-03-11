import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "./logo.png";

import "./styles.scss";

export const Header = () => {
	return (
		<>
			<Navbar bg="white">
				<Container>
					<Navbar.Brand>
						<Link to={"/"} className="brand_link">
							<img
								alt=""
								width="50%"
								src={logo}
								className="d-inline-block align-top brand"
							/>
							<span className="brand__title">
								Social Feed
							</span>
						</Link>
					</Navbar.Brand>
					<Navbar.Text>
						Signed in as: <a href="#login">John Doe</a>
					</Navbar.Text>
				</Container>
			</Navbar>
		</>
	);
};
