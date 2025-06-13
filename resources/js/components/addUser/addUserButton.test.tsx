import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddUserButton from './addUserButton';
import axios from 'axios';
import { vi, describe, beforeEach, it, expect } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as unknown as {
    post: ReturnType<typeof vi.fn>;
};

describe('AddUserButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Prevent actual navigation during tests
        Object.defineProperty(window, 'location', {
            value: { href: '', assign: vi.fn() },
            writable: true,
        });
    });

    it('renders the Add User and Initial Users buttons', () => {
        render(<AddUserButton />);
        expect(screen.getByText('+ Add User')).toBeInTheDocument();
        expect(screen.getByText('Initial Users')).toBeInTheDocument();
    });

    it('shows modal when "+ Add User" is clicked', () => {
        render(<AddUserButton />);
        fireEvent.click(screen.getByText('+ Add User'));
        expect(screen.getByText('Add User')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Age')).toBeInTheDocument();
        expect(screen.getByLabelText('Address')).toBeInTheDocument();
    });

    it('submits the form and closes modal', async () => {
        mockedAxios.post = vi.fn().mockResolvedValue({ status: 200 });
        render(<AddUserButton />);
        fireEvent.click(screen.getByText('+ Add User'));
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText('Age'), { target: { value: 30 } });
        fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Test St' } });
        fireEvent.click(screen.getByText('Save Changes'));
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('/addUser', {
                formData: { name: 'Test User', age: '30', address: '123 Test St' }
            });
            expect(window.location.href).toBe('/');
        });
    });

    it('calls initial users endpoint and redirects', async () => {
        mockedAxios.post = vi.fn().mockResolvedValue({ status: 200 });
        render(<AddUserButton />);
        fireEvent.click(screen.getByText('Initial Users'));
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('api/initialUsers');
            expect(window.location.href).toBe('/');
        });
    });
});