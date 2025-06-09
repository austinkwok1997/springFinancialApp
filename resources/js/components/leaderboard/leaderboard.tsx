import { Button } from "@/components/ui/button"

export default function Leaderboard() {
    return (
        <>
            <Button variant="destructive" size="lg">X</Button>
            <span>Emma</span>
            <Button variant="default" size="lg">+</Button>
            <Button variant="destructive" size="lg">-</Button>
            <span>25 points</span>
        </>
    )
}