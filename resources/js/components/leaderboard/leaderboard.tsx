import LeaderboardEntry from "./leaderboardEntry";
import { type User } from "@/types";

interface LeaderboardProps {
    users: User[];
}

export default function Leaderboard({ users }: LeaderboardProps) {

    return (
        <>
            {users.map((user) => (
                <LeaderboardEntry key={user.id} user={user} />
            ))}
        </>
    )
}