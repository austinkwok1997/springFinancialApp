import LeaderboardEntry from "./leaderboardEntry";
import { type User } from "@/types";
import { useState, useEffect } from 'react';

interface LeaderboardProps {
    userList: User[];
    setUserList: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function Leaderboard({ userList, setUserList }: LeaderboardProps) {
    const [sortByPoints, setSortByPoints] = useState(true);

    const updateUser = (user: User) => {
        let newList = [...userList];
        let userIndex = newList.findIndex((x) => x.id == user.id)
        newList[userIndex].points = user.points;
        if (sortByPoints) {
            newList.sort((a, b) => b.points - a.points);
        }
        setUserList(newList)
    }

    const deleteUser = (user: User) => {
        setUserList(userList.filter(x => x.id !== user.id));
    }

    useEffect(() => {
        handleSort(sortByPoints);
    }, []);

    const handleSort = (byPoints: boolean) => {
        let sortedList = userList;
        setSortByPoints(byPoints)
        if (byPoints) {
            sortedList.sort((a, b) => b.points - a.points);
        } else {
            sortedList.sort((a, b) => a.name.localeCompare(b.name));
        }
        setUserList(sortedList);
    }

    return (
        <>
            <div>
                <input type="checkbox" checked={!sortByPoints} onChange={() => handleSort(false)} />
                <label>Sort by Name</label>
                <input type="checkbox" checked={sortByPoints} onChange={() => handleSort(true)} />
                <label>Sort by Points</label>
            </div>
            {userList.map((user) => (
                <LeaderboardEntry key={user.id} user={user} updateUser={updateUser} deleteUser={deleteUser} />
            ))}
        </>
    )
}