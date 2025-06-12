import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;

export default function AddUserButton() {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        age: 0,
        address: ""
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        axios.post('/addUser', {
            formData
        })
            .then(response => {
                setShow(false);
                window.location.href = "/";
            });
    }

    const handleInput = (e: InputEvent) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Row>
            <Col md={11}>
                <Button className="float-end" size="lg" onClick={handleShow}>+ Add User</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="userForm" onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleInput} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <Form.Control required type="number" name="age" placeholder="Enter Age" value={formData.age} onChange={handleInput} min="0" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control required type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleInput} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" form="userForm" variant="primary" >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row >
    )
}