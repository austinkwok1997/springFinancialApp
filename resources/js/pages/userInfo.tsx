import { User } from '@/types'

interface UserInfoProps {
    user: User
}

export default function UserInfo({ user }: UserInfoProps) {
    return (
        <>
            <ul>
                <li>Name: {user.name}</li>
                <li>Age: {user.age}</li>
                <li>Points: {user.points}</li>
                <li>Address: {user.address}</li>
            </ul>
            <a href="/">Go Back</a>
        </>
    )
}