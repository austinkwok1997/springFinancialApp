import { Button } from "@/components/ui/button";
import { useState } from 'react';
import axios from 'axios';

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;

export default function AddUserPage() {
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
                window.location.href = "/";
            });
    }

    const handleInput = (e: InputEvent) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleSubmit}>
            Name: <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleInput}></input>
            Age: <input type="number" name="age" placeholder="Enter Age" value={formData.age} onChange={handleInput}></input>
            Address: <input type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleInput}></input>
            <Button type="submit">Add User</Button>
        </form>
    )
}