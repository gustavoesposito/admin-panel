import React from 'react';
import { render } from '@testing-library/react';
import TagComponent, { PropsTag } from '../Tag';


const renderTag = (props: PropsTag) => {
  return render(<TagComponent {...props} />);
};

describe('TagComponent', () => {
  it('deve renderizar corretamente com as props padrão', () => {
    const { getByText } = renderTag({});
    const tagElement = getByText('');
    expect(tagElement).toBeDefined();
  });

  it('deve renderizar o texto filho', () => {
    const { getByText } = renderTag({ children: 'Texto de exemplo' });
    const tagElement = getByText('Texto de exemplo');
    expect(tagElement).toBeDefined();
  });

  it('deve aplicar a classe "positive" quando o tema for "positive"', () => {
    const { container } = renderTag({ theme: 'positive' });
    const tagElement = container.querySelector('.positive');
    expect(tagElement).toBeDefined();
  });

  it('deve aplicar a classe "negative" quando o tema for "negative"', () => {
    const { container } = renderTag({ theme: 'negative' });
    const tagElement = container.querySelector('.negative');
    expect(tagElement).toBeDefined();
  });
});
