import { render, screen } from '~/test/test-utils';
import { ArticleCard } from './ArticleCard';
import { describe, expect, it } from 'vitest';
import { mockArticle } from '~/test/mockdata';

describe('ArticleCard', () => {
  it('renders ArticleCard', () => {
    const { getByRole } = render(<ArticleCard article={mockArticle} />);
    expect(getByRole('link')).toBeInTheDocument();
  });

  it('should render article card header image', () => {
    const { getByRole } = render(<ArticleCard article={mockArticle} />);
    expect(getByRole('img')).toBeInTheDocument();
  });

  it('should render article card header icon', () => {
    const { getByTestId } = render(
      <ArticleCard article={{ ...mockArticle, multimedia: [] }} />
    );
    expect(getByTestId('article-card-icon')).toBeInTheDocument();
  });

  it('should render formated publish date', () => {
    const { getByText } = render(<ArticleCard article={mockArticle} />);
    expect(getByText('Oct 30, 2024')).toBeInTheDocument();
  });
});
