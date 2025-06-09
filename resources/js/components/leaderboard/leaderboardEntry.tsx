import { Button } from "@/components/ui/button";
import { type User } from "@/types";

interface LeaderboardEntryProps {
    user: User;
}

export default function LeaderboardEntry({ user }: LeaderboardEntryProps) {
    return (
        <div>
            <Button variant="destructive" size="lg">X</Button>
            <span>{user.name}</span>
            <Button variant="default" size="lg">+</Button>
            <Button variant="destructive" size="lg">-</Button>
            <span>{user.points}</span>
        </div>
    )
}