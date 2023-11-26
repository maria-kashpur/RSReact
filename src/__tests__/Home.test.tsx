/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from '../pages/index';

test('Pages Router', () => {
  render(<Home />);
});
