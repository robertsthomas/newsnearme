import { describe, expect, it } from 'vitest';
import { getArticleId } from './utils';
import { mockArticle } from '~/test/mockdata';

describe('lib utils', () => {
  it('split article id to only numbers', () => {
    expect(getArticleId(mockArticle._id)).toEqual(
      'a18df93d-8cdd-56ee-bff8-816a53498afb'
    );
  });
});
