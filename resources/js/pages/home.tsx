import Leaderboard from "@/components/leaderboard/leaderboard";
import { type User } from "@/types";
import AddUserButton from "@/components/addUser/addUserButton";

interface HomeProps {
    users: User[]
}
export default function Home({ users }: HomeProps) {
    return (
        <>
            <Leaderboard users={users} />
            <AddUserButton />
        </>
    )
}