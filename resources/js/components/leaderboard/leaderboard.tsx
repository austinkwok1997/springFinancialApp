import LeaderboardEntry from "./leaderboardEntry";
import { type User } from "@/types";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface LeaderboardProps {
    users: User[];
}

export default function Leaderboard({ users }: LeaderboardProps) {
    const [sortByPoints, setSortByPoints] = useState(true);
    const [filterTerm, setFilterTerm] = useState("");
    const [userList, setUserList] = useState(users);

    useEffect(() => {
        setUserList(users.filter(x => x.name.includes(filterTerm)))
    }, [filterTerm])

    const handleChange = (e: InputEvent) => {
        setFilterTerm(e.target.value);
    }

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
        <Row className="justify-content-md-center">
            <Col md="8">
                <Form.Control name="filter" type="text" onChange={handleChange} value={filterTerm} placeholder="Search" />
                <div>
                    <input type="checkbox" checked={!sortByPoints} onChange={() => handleSort(false)} />
                    <label>Sort by Name</label>
                    <input type="checkbox" checked={sortByPoints} onChange={() => handleSort(true)} />
                    <label>Sort by Points</label>
                </div>
                <Table borderless>
                    <tbody>
                        {userList.map((user) => (
                            <LeaderboardEntry key={user.id} user={user} updateUser={updateUser} deleteUser={deleteUser} />
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}