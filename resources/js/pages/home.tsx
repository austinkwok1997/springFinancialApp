import Leaderboard from "@/components/leaderboard/leaderboard";
import { type User } from "@/types";
import AddUserButton from "@/components/addUser/addUserButton";
import NameFilter from '@/components/nameFilter/nameFilter';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface HomeProps {
    users: User[]
}

export default function Home({ users }: HomeProps) {
    const [userList, setUserList] = useState(users);
    const [filterTerm, setFilterTerm] = useState("");

    const handleChange = (e: InputEvent) => {
        setFilterTerm(e.target.value);
    }

    return (
        <>
            <Input name="filter" type="text" onChange={handleChange} value={filterTerm} />
            <Leaderboard userList={userList} setUserList={setUserList} />
            <AddUserButton />
        </>
    )
}