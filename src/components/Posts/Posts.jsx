import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestPosts } from "../../actions";
import { Container, Spinner, Form } from "react-bootstrap";
import { PostCard } from "../PostCard/PostCard";

import data from "../../data";

import "./styles.scss";

export const Posts = () => {
	const [search, setNewSearch] = useState("");

	const { postsList, isLoading } = useSelector(
		(state) => state
	);

	const dispatch = useDispatch();
	useEffect(() => {
		if (!postsList?.length > 0) dispatch(requestPosts());
	}, []);

	const handleSearchChange = (e) => {
		setNewSearch(e.target.value);
	};

	const filtered = !search
		? postsList
		: postsList.filter((post) =>
				post.title
					?.toLowerCase()
					.includes(search.toLowerCase())
		  );

	return (
		<div className="posts">
			{isLoading ? (
				<div
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: 500,
					}}
				>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">
							Loading...
						</span>
					</Spinner>
				</div>
			) : (
				<Container>
					<Form.Group className="mt-3 mb-3">
						<Form.Label>Search Post</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter post name"
							defaultValue={search}
							onChange={handleSearchChange}
						/>
					</Form.Group>

					<div className="wrapper">
						{filtered.map((post) => {
							return <PostCard post={post} key={post.id} />;
						})}
					</div>
				</Container>
			)}
		</div>
	);
};
