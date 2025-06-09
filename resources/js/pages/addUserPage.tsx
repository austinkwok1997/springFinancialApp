import { Button } from "@/components/ui/button";
import { useState } from 'react';
import axios from 'axios';

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;

export default function AddUserPage() {
    const [name, setName] = useState("");
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        axios.post('/addUser', {
            formData: { name }
        })
            .then(response => {
                window.location.href = "/";
            });
    }

    const handleInput = (e: InputEvent) => {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            Name: <input type="text" name="name" placeholder="Enter Name" value={name} onChange={handleInput}></input>
            <Button type="submit">Add User</Button>
        </form>
    )
}