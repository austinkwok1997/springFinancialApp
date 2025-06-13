import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeaderboardEntry from './leaderboardEntry';
import type { User } from '@/types';
import axios from 'axios';
import { vi, describe, beforeEach, it, Mock } from 'vitest';
import { expect } from 'vitest';

// If using Vitest, ensure the environment is set to 'jsdom' in your vitest.config.ts
// Alternatively, you can import expect directly if not using globals

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('LeaderboardEntry', () => {
    const user: User = {
        id: 1,
        name: 'Alice',
        age: 25,
        points: 10,
        address: '123 Main St',
    };

    const updateUser = vi.fn();
    const deleteUser = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders user info', () => {
        render(<table><tbody><LeaderboardEntry user={{ ...user }} updateUser={updateUser} deleteUser={deleteUser} /></tbody></table>);
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText(/10 points/i)).toBeInTheDocument();
    });

    it('calls updateUser and increments points when "+" is clicked', async () => {
        (mockedAxios.put as unknown as Mock).mockResolvedValue({ status: 200 });
        render(<table><tbody><LeaderboardEntry user={{ ...user }} updateUser={updateUser} deleteUser={deleteUser} /></tbody></table>);
        fireEvent.click(screen.getByText('+'));
        await waitFor(() => {
            expect(updateUser).toHaveBeenCalledWith(expect.objectContaining({ points: 11 }));
        });
    });

    it('calls updateUser and decrements points when "-" is clicked', async () => {
        (mockedAxios.put as unknown as Mock).mockResolvedValue({ status: 200 });
        render(<table><tbody><LeaderboardEntry user={{ ...user }} updateUser={updateUser} deleteUser={deleteUser} /></tbody></table>);
        fireEvent.click(screen.getByText('-'));
        await waitFor(() => {
            expect(updateUser).toHaveBeenCalledWith(expect.objectContaining({ points: 9 }));
        });
    });

    it('calls deleteUser when "X" is clicked', async () => {
        (mockedAxios.delete as unknown as Mock).mockResolvedValue({ status: 200 });
        render(<table><tbody><LeaderboardEntry user={{ ...user }} updateUser={updateUser} deleteUser={deleteUser} /></tbody></table>);
        fireEvent.click(screen.getByText('X'));
        await waitFor(() => {
            expect(deleteUser).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
        });
    });

    it('shows modal with user details when name is clicked', () => {
        render(<table><tbody><LeaderboardEntry user={{ ...user }} updateUser={updateUser} deleteUser={deleteUser} /></tbody></table>);
        fireEvent.click(screen.getByText('Alice'));
        expect(screen.getByText('Name: Alice')).toBeInTheDocument();
        expect(screen.getByText('Age: 25')).toBeInTheDocument();
        expect(screen.getByText('Points: 10')).toBeInTheDocument();
        expect(screen.getByText('Address: 123 Main St')).toBeInTheDocument();
    });
});