import LeaderboardEntry from "./leaderboardEntry";
import { type User } from "@/types";
import { useState, useEffect } from 'react';

interface LeaderboardProps {
    users: User[];
}

export default function Leaderboard({ users }: LeaderboardProps) {
    const [usersList, setUsersList] = useState(users);

    useEffect(() => {
        const sortedList = usersList;
        sortedList.sort((a, b) => b.points - a.points);
        setUsersList(sortedList);
    }, [])

    const updateUser = (user: User) => {
        let newList = [...usersList.filter(x => x.id !== user.id), user]
        newList.sort((a, b) => b.points - a.points);
        setUsersList(newList)
    }

    return (
        <>
            {usersList.map((user) => (
                <LeaderboardEntry key={user.id} user={user} updateUser={updateUser} />
            ))}
        </>
    )
}