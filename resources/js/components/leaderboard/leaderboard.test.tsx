import { render, screen, fireEvent } from '@testing-library/react';
import Leaderboard from './leaderboard';
import type { User } from '@/types';
import { vi, describe, it, expect } from 'vitest';

// Mock LeaderboardEntry to avoid testing its internals here
vi.mock('./leaderboardEntry', () => ({
    default: ({ user }: { user: User }) => <tr data-testid="entry"><td>{user.name}</td><td>{user.points}</td></tr>
}));

const users: User[] = [
    { id: 1, name: 'Alice', age: 25, points: 10, address: '123 Main St' },
    { id: 2, name: 'Bob', age: 30, points: 20, address: '456 Oak Ave' },
    { id: 3, name: 'Charlie', age: 22, points: 15, address: '789 Pine Rd' },
];

describe('Leaderboard', () => {
    it('renders all users', () => {
        render(<Leaderboard users={users} />);
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('Charlie')).toBeInTheDocument();
    });

    it('filters users by name', () => {
        render(<Leaderboard users={users} />);
        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'Bob' } });
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.queryByText('Alice')).not.toBeInTheDocument();
        expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
    });

    it('sorts users by points by default', () => {
        render(<Leaderboard users={users} />);
        const rows = screen.getAllByTestId('entry');
        // Bob (20), Charlie (15), Alice (10)
        expect(rows[0]).toHaveTextContent('Bob');
        expect(rows[1]).toHaveTextContent('Charlie');
        expect(rows[2]).toHaveTextContent('Alice');
    });

    it('sorts users by name when switch is toggled', () => {
        render(<Leaderboard users={users} />);
        const nameSwitch = screen.getByLabelText('Sort By Name');
        fireEvent.click(nameSwitch);
        const rows = screen.getAllByTestId('entry');
        // Alice, Bob, Charlie
        expect(rows[0]).toHaveTextContent('Alice');
        expect(rows[1]).toHaveTextContent('Bob');
        expect(rows[2]).toHaveTextContent('Charlie');
    });

    it('sorts users by points when switch is toggled back', () => {
        render(<Leaderboard users={users} />);
        const nameSwitch = screen.getByLabelText('Sort By Name');
        const pointsSwitch = screen.getByLabelText('Sort By Points');
        fireEvent.click(nameSwitch); // sort by name
        fireEvent.click(pointsSwitch); // sort by points
        const rows = screen.getAllByTestId('entry');
        // Bob (20), Charlie (15), Alice (10)
        expect(rows[0]).toHaveTextContent('Bob');
        expect(rows[1]).toHaveTextContent('Charlie');
        expect(rows[2]).toHaveTextContent('Alice');
    });
});