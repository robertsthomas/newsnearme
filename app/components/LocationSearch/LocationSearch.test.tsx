import {
  render,
  screen,
  fireEvent,
  cleanup,
  getByRole,
} from '~/test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { LocationSearch } from './LocationSearch';

describe('LocationSearch', () => {
  it('should render LocationSearch', async () => {
    const { getByRole } = render(<LocationSearch onSearch={() => {}} />);

    expect(getByRole('combobox')).toBeInTheDocument();
  });

  it('should open dropdown on click', () => {
    const { getByRole, queryAllByRole } = render(
      <LocationSearch onSearch={() => {}} />
    );

    fireEvent.click(getByRole('combobox'));
    expect(getByRole('presentation')).toBeInTheDocument();
    expect(queryAllByRole('option')).not.toHaveLength(0);
  });

  it('should select an option on click as set it as the value', () => {
    const { getByRole, getByText, getByTestId } = render(
      <LocationSearch onSearch={() => {}} />
    );

    fireEvent.click(getByRole('combobox'));
    fireEvent.click(getByText('Arizona'));
    expect(getByTestId('location-search-value')).toHaveTextContent('Arizona');
  });

  it('should render button next to dropdown', () => {
    const { getByTestId, getByRole } = render(
      <LocationSearch onSearch={() => {}} withButton />
    );
    expect(getByTestId('location-search-button')).toBeInTheDocument();
    expect(getByRole('combobox')).toHaveClass('rounded-l-none');
  });

  it('should set size prop to class', () => {
    render(<LocationSearch size='lg' onSearch={() => {}} />);
    expect(screen.getByRole('combobox')).toHaveClass('size-12');

    cleanup();

    render(<LocationSearch size='sm' onSearch={() => {}} />);
    expect(screen.getByRole('combobox')).toHaveClass('size-8');
  });

  it('should fire onSearch event when value is changed', () => {
    const onSearch = vi.fn();
    const { getByRole, getByText } = render(
      <LocationSearch onSearch={onSearch} />
    );
    fireEvent.click(getByRole('combobox'));
    fireEvent.click(getByText('Arizona'));
    expect(onSearch).toHaveBeenCalledWith('Arizona');
  });
});
