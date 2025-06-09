import { Button, buttonVariants } from "@/components/ui/button";
import Leaderboard from "@/components/leaderboard/leaderboard";

export default function Home() {
    return (
        <>
            <Leaderboard />
            <div>
                <Button>+ Add User</Button>
            </div>
        </>
    )
}