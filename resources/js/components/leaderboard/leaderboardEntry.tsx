import { Button } from "@/components/ui/button";
import { type User } from "@/types";
import axios from 'axios';

interface LeaderboardEntryProps {
    user: User;
    updateUser: Function;
    deleteUser: Function;
}

export default function LeaderboardEntry({ user, updateUser, deleteUser }: LeaderboardEntryProps) {

    const addPoint = async () => {
        try {
            const response = await axios.put('/api/points/' + user.id, {
                body: {
                    points: user.points + 1
                }
            });
            if (response.status == 200) {
                user.points = user.points + 1;
                updateUser(user);
            } else {
                console.error('Error adding point');
            }
        } catch (error) {
            console.error('Error adding point', error);
        }
    }

    const minusPoint = async () => {
        try {
            const response = await axios.put('/api/points/' + user.id, {
                body: {
                    points: user.points - 1
                }
            })
            if (response.status == 200) {
                user.points = user.points - 1;
                updateUser(user);
            }
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
        <div>
            <Button variant="destructive" size="lg" onClick={handleDelete}>X</Button>
            <a href={"/user/" + user.id}>{user.name}</a>
            <Button variant="default" size="lg" onClick={addPoint}>+</Button>
            <Button variant="destructive" size="lg" onClick={minusPoint}>-</Button>
            <span>{user.points}</span>
        </div>
    )
}