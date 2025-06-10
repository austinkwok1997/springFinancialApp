import Leaderboard from "@/components/leaderboard/leaderboard";
import { type User } from "@/types";
import AddUserButton from "@/components/addUser/addUserButton";
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface HomeProps {
    users: User[]
}

export default function Home({ users }: HomeProps) {
    const [userList, setUserList] = useState(users);
    const [filterTerm, setFilterTerm] = useState("");

    useEffect(() => {
        setUserList(users.filter(x => x.name.includes(filterTerm)))
    }, [filterTerm])

    const handleChange = (e: InputEvent) => {
        setFilterTerm(e.target.value);
    }

    const handleInitialUsers = async () => {
        axios.get('api/initialUsers')
            .then(response => {
                window.location.href = "/";
            })
    }

    return (
        <>
            <Input name="filter" type="text" onChange={handleChange} value={filterTerm} placeholder="Search" />
            <Leaderboard userList={userList} setUserList={setUserList} />
            <AddUserButton />
            <Button onClick={handleInitialUsers}>Initial Users</Button>
        </>
    )
}