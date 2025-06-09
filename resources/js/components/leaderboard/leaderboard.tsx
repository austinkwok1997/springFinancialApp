import LeaderboardEntry from "./leaderboardEntry";
import { type User } from "@/types";
import { useState, useEffect } from 'react';

interface LeaderboardProps {
    userList: User[];
    setUserList: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function Leaderboard({ userList, setUserList }: LeaderboardProps) {

    useEffect(() => {
        const sortedList = userList;
        sortedList.sort((a, b) => b.points - a.points);
        setUserList(sortedList);
    }, [])

    const updateUser = (user: User) => {
        let newList = [...userList.filter(x => x.id !== user.id), user]
        newList.sort((a, b) => b.points - a.points);
        setUserList(newList)
    }

    const deleteUser = (user: User) => {
        setUserList(userList.filter(x => x.id !== user.id));
    }

    return (
        <>
            {userList.map((user) => (
                <LeaderboardEntry key={user.id} user={user} updateUser={updateUser} deleteUser={deleteUser} />
            ))}
        </>
    )
}