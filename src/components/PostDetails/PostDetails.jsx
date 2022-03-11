import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	requestPostDetails,
	updatePostData,
	deletePost,
} from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import {
	Dropdown,
	Container,
	Modal,
	Form,
	Button,
	Spinner,
} from "react-bootstrap";
import {
	useParams,
	Link,
	useNavigate,
} from "react-router-dom";

import "./styles.scss";

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
					Edit Post
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={updateData}>
					<Form.Group
						className="mb-3"
						controlId="formBasicEmail"
					>
						<Form.Label>Post Title</Form.Label>
						<Form.Control
							required
							type="text"
							name="postTitle"
							placeholder="Edit Title"
							defaultValue={props?.title}
						/>
					</Form.Group>

					<Form.Group
						className="mb-3"
						controlId="formBasicPassword"
					>
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

function DeletePost(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(deletePost(props.id));
		props.onHide();
		navigate("/");
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
				Are You Sure You Want To Delete
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

export const PostDetails = () => {
	const { id } = useParams();
	const { singlePost, isLoading, postsList } = useSelector(
		(state) => state
	);
	const dispatch = useDispatch();
	const [modalShow, setModalShow] = React.useState(false);
	const [deletelShow, setDeleteShow] =
		React.useState(false);
	const submitRef = useRef();

	useEffect(() => {
		dispatch(requestPostDetails(id, postsList));
	}, []);

	const updateData = (e) => {
		e.preventDefault();
		dispatch(
			updatePostData(
				singlePost.id,
				e.target.postTitle.value,
				e.target.postBody.value
			)
		);
	};

	return (
		<div className="post__details">
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
					<DeletePost
						show={deletelShow}
						onHide={() => setDeleteShow(false)}
						id={singlePost?.id}
					/>
					<MyVerticallyCenteredModal
						show={modalShow}
						onHide={() => setModalShow(false)}
						id={singlePost?.id}
						title={singlePost?.title}
						body={singlePost?.body}
					/>
					<div className="post">
						<div className="post__header">
							<div className="post__title">
								<h3>{singlePost?.title}</h3>
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
											Edit
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
							<p>{singlePost?.body}</p>
						</div>
					</div>

					<Form onSubmit={updateData}>
						<div className="post">
							<div className="post__header">
								<div className="post__title">
									<Form.Control
										required
										type="text"
										name="postTitle"
										placeholder="Edit Title"
										defaultValue={singlePost?.title}
									/>
								</div>
							</div>
							<div className="post__body">
								<Form.Control
									required
									name="postBody"
									as="textarea"
									rows={7}
									defaultValue={singlePost?.body}
								/>
								<Button
									variant="primary"
									onClick={() => submitRef.current.click()}
								>
									Update
								</Button>
							</div>
						</div>

						<button
							ref={submitRef}
							type="submit"
							style={{ display: "none" }}
						></button>
					</Form>

					<Link to={"/"}>Go Back </Link>
				</Container>
			)}
		</div>
	);
};
