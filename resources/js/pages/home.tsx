import { Button, buttonVariants } from "@/components/ui/button";
import Leaderboard from "@/components/leaderboard/leaderboard";
import { type User } from "@/types";

interface HomeProps {
    users: User[]
}
export default function Home({ users }: HomeProps) {
    return (
        <>
            <Leaderboard users={users} />
            <div>
                <Button>+ Add User</Button>
            </div>
        </>
    )
}