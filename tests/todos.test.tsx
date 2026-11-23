// @vitest-environment jsdom

import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { Todos } from '@/app/todos';

const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));

vi.mock('@/utils/supabase/server', () => ({ createClient }));

function mockTodosResponse(response: {
  data: { id: number; name: string }[] | null;
  error: { code: string } | null;
}) {
  const select = vi.fn().mockResolvedValue(response);
  const from = vi.fn().mockReturnValue({ select });
  createClient.mockResolvedValue({ from });
  return { from, select };
}

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

test('reads and renders the sample rows as a list', async () => {
  const { from, select } = mockTodosResponse({
    data: [{ id: 1, name: 'Plan the route' }],
    error: null,
  });

  render(await Todos());

  expect(from).toHaveBeenCalledWith('todos');
  expect(select).toHaveBeenCalledWith('id, name');
  expect(within(screen.getByRole('list')).getByRole('listitem').textContent).toBe(
    'Plan the route'
  );
});

test('shows a setup message when Supabase is not configured', async () => {
  createClient.mockResolvedValue(null);

  render(await Todos());

  expect(screen.getByText('Supabase is not configured.')).toBeDefined();
});

test.each([
  { data: [], error: null, message: 'No todos yet.' },
  {
    data: null,
    error: { code: 'PGRST205' },
    message: 'The todos table is unavailable.',
  },
  {
    data: null,
    error: { code: '42501' },
    message: 'Could not load todos.',
  },
])('shows $message', async ({ data, error, message }) => {
  mockTodosResponse({ data, error });

  render(await Todos());

  expect(screen.getByText(message)).toBeDefined();
  expect(screen.queryByRole('list')).toBeNull();
});
