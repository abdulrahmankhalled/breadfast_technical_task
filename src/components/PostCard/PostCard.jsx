import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
	Modal,
	Button,
	Form,
	Dropdown,
} from "react-bootstrap";

import "./styles.scss";
import { updatePostData, deletePost } from "../../actions";

function MyVerticallyCenteredModal(props) {
	const dispatch = useDispatch();

	const submitRef = useRef();
	const updateData = (e) => {
		e.preventDefault();
		dispatch(
			updatePostData(
				props.id,
				e.target.postTitle.value,
				e.target.postBody.value
			)
		);

		props.onHide();
	};
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					View: {props.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={updateData}>
					<Form.Group className="mb-3">
						<Form.Label>Post Title</Form.Label>
						<Form.Control
							required
							type="text"
							name="postTitle"
							placeholder="Edit Title"
							defaultValue={props.title}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Post Body</Form.Label>
						<Form.Control
							required
							name="postBody"
							as="textarea"
							rows={7}
							defaultValue={props.body}
						/>
					</Form.Group>
					<button
						ref={submitRef}
						type="submit"
						style={{ display: "none" }}
					></button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={props.onHide}>
					Close
				</Button>

				<Button onClick={() => submitRef.current.click()}>
					Update
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

MyVerticallyCenteredModal.propTypes = {
	props: PropTypes.shape({
		title: PropTypes.string,
		body: PropTypes.string,
		id: PropTypes.number,
	}),
};

function DeletePost(props) {
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(deletePost(props.id));
		props.onHide();
	};
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Delete Post
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Are You Sure You Want To Delete</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={props.onHide}>
					Close
				</Button>
				<Button onClick={() => handleDelete()}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export const PostCard = ({ post }) => {
	const [modalShow, setModalShow] = React.useState(false);
	const [deletelShow, setDeleteShow] =
		React.useState(false);

	return (
		<div className="post">
			<DeletePost
				show={deletelShow}
				onHide={() => setDeleteShow(false)}
				id={post?.id}
			/>
			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				id={post?.id}
				title={post.title}
				body={post.body}
			/>
			<div className="post__header">
				<div className="post__title">
					<h3>{post.title}</h3>
				</div>
				<div className="post__actions">
					<Dropdown className="d-inline mx-2">
						<Dropdown.Toggle id="dropdown-autoclose-true">
							<FontAwesomeIcon
								icon={faEllipsis}
								size="lg"
							/>
						</Dropdown.Toggle>

						<Dropdown.Menu align={{ lg: "start" }}>
							<Dropdown.Item
								onClick={() => setModalShow(true)}
							>
								View
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDeleteShow(true)}
							>
								Delete
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<div className="post__body">
				<p>{post.body}</p>

				<Link to={`/post/${post.id}`}>View Post</Link>
			</div>
		</div>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		title: PropTypes.string,
		body: PropTypes.string,
		id: PropTypes.number,
	}),
};
