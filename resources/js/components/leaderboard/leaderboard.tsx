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
                <Table borderless>
                    <thead>
                        <th></th>
                        <th className="d-flex justify-content-center"><Form.Check id="sort-by-name-switch" type="switch" label="Sort By Name" checked={!sortByPoints} onChange={() => handleSort(false)} /></th>
                        <th></th>
                        <th></th>
                        <th className="d-flex justify-content-center"><Form.Check id="sort-by-points-switch" type="switch" label="Sort By Points" checked={sortByPoints} onChange={() => handleSort(true)} /></th>
                    </thead>
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