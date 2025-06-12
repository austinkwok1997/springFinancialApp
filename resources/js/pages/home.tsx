import Leaderboard from "@/components/leaderboard/leaderboard";
import { type User } from "@/types";
import AddUserButton from "@/components/addUser/addUserButton";
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface HomeProps {
    users: User[]
}

export default function Home({ users }: HomeProps) {
    return (
        <Container>
            <Leaderboard users={users} />
            <AddUserButton />
        </Container>
    )
}