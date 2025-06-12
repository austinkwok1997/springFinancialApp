import Button from "react-bootstrap/Button";
import { type User } from "@/types";
import axios from 'axios';

interface LeaderboardEntryProps {
    user: User;
    updateUser: Function;
    deleteUser: Function;
}

export default function LeaderboardEntry({ user, updateUser, deleteUser }: LeaderboardEntryProps) {

    const addPoint = () => {
        try {
            axios.put('/points/' + user.id, {
                body: {
                    points: user.points + 1
                }
            }).then(response => {
                if (response.status !== 200) {
                    console.error('Error adding point');
                }
            });
            user.points = user.points + 1;
            updateUser(user);
        } catch (error) {
            console.error('Error adding point', error);
        }
    }

    const minusPoint = async () => {
        try {
            axios.put('/points/' + user.id, {
                body: {
                    points: user.points - 1
                }
            }).then(response => {
                if (response.status !== 200) {
                    console.error('Error adding point');
                }
            })
            user.points = user.points - 1;
            updateUser(user);
        } catch (error) {
            console.error('Error removing point', error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete('/deleteUser/' + user.id)

            if (response.status == 200) {
                deleteUser(user);
            }
        } catch (error) {
            console.error('Error removing point', error);
        }
    }

    return (
        <tr >
            <td className="align-middle"><Button variant="danger" style={{ padding: '5px 28px', fontWeight: 700 }} size="lg" onClick={handleDelete}>X</Button></td>
            <td className="align-middle text-center"><a className="align-middle" style={{ fontSize: 18, textDecoration: 'none', fontWeight: 800 }} href={"/user/" + user.id}><h3>{user.name}</h3></a></td>
            <td className="align-middle"><Button variant="success" style={{ padding: '5px 28px', fontWeight: 800 }} size="lg" onClick={addPoint}>+</Button></td>
            <td className="align-middle"><Button variant="danger" style={{ padding: '5px 32px', fontWeight: 800 }} size="lg" onClick={minusPoint}>-</Button></td>
            <td className="align-middle"><h5 style={{ marginLeft: "60px" }}>{user.points} points</h5></td>
        </tr>
    )
}