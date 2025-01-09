import { render, screen } from '~/test/test-utils';
import { describe, it, expect } from 'vitest';
import { GlobalHeader } from './GlobalHeader';

describe('GlobalHeader', () => {
  it('should render GlobalHeader', () => {
    const { getByRole } = render(<GlobalHeader />);
    expect(getByRole('banner')).toBeInTheDocument();
  });
});
