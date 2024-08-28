import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConsentList from './ConsentList';
import { useConsents } from '@/context/consent/useConsents';
import { ConsentData } from '@/types/consents';

// Mock the useConsents hook
vi.mock('@/context/consent/useConsents', () => ({
  useConsents: vi.fn(),
}));

const mockConsents: ConsentData[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    permissions: {
      receiveNewsletter: true,
      showTargetedAds: false,
      contributeToStatistics: true,
    },
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    permissions: {
      receiveNewsletter: false,
      showTargetedAds: true,
      contributeToStatistics: true,
    },
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    permissions: {
      receiveNewsletter: true,
      showTargetedAds: true,
      contributeToStatistics: false,
    },
  },
];

describe('ConsentList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const renderConsentList = (isLoading = false, error: string | null = null) => {
    vi.mocked(useConsents).mockReturnValue({
      consents: mockConsents,
      isLoading,
      error,
      fetchConsents: vi.fn().mockResolvedValue(undefined),
    });

    return render(<ConsentList />);
  };

  it('should render table headers correctly', () => {
    renderConsentList();

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Consent given for')).toBeInTheDocument();
  });

  it('should display loading skeletons when loading state is true', () => {
    renderConsentList(true);

    const skeletons = screen.getAllByRole('row');
    expect(skeletons.length).toBe(3); // Header + 2 skeleton rows
  });

  it('should render consents data correctly when loaded', async () => {
    renderConsentList();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Receive newsletter, Contribute to anonymous visit statistics')).toBeInTheDocument();
    });
  });

  it('should handle pagination and display correct data', async () => {
    renderConsentList();

    // Verify initial page
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();

    // Move to the next page
    const nextPageButton = screen.getByRole('button', { name: 'Go to page 2' });
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });

  it('should display an error message and retry button when fetch fails', async () => {
    const mockFetchConsents = vi.fn();
    vi.mocked(useConsents).mockReturnValue({
      consents: [],
      isLoading: false,
      error: 'Failed to load consents',
      fetchConsents: mockFetchConsents,
    });

    render(<ConsentList />);

    expect(screen.getByText('Failed to load consents')).toBeInTheDocument();
    const retryButton = screen.getByRole('button', { name: 'Retry' });
    expect(retryButton).toBeInTheDocument();
  });
});