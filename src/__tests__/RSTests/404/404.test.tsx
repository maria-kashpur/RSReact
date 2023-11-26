import { afterEach, expect, test, vi, describe } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import { beforeEach } from 'node:test';
import renderWithProvider from '@/__tests__/data/renderWithProvider';
import Home from '@/pages';
import ErrorPage from '@/components/ErrorPage/ErrorPage';

describe('Testing Router', () => {
  beforeEach(() => {
    vi.mock('next/router', () => vi.importActual('next-router-mock'));
  });
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test('should show 404 page', async () => {
    renderWithProvider(<ErrorPage />);
    expect(screen.getByText('The error was raised and handled')).toBeDefined();
  });

  test('should show the main page', async () => {
    renderWithProvider(<Home />);
    expect(screen.getByText('Potions')).toBeInTheDocument();
  });
});
