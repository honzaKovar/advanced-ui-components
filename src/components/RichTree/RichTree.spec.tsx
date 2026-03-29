import { render } from '@testing-library/react';
import { createRef } from 'react';

import { mockedItems } from './__mocks__';
import { RichTree } from './RichTree';

describe('RichTree', () => {
  it('should forward the DOM ref properly to the underlying UL element', () => {
    const ref = createRef<HTMLUListElement>();

    render(<RichTree items={mockedItems} ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('UL');

    expect(ref.current?.classList.toString()).toContain('MuiRichTreeViewPro-root');
  });
});
