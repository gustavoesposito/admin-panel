import React, { PropsWithChildren, ReactNode } from 'react';
import style from './Tag.module.scss';

export interface PropsTag extends PropsWithChildren<any> {
  theme?: 'positive' | 'negative';
  children?: ReactNode
}

function TagComponent({
  theme = 'positive',
  children,
}: PropsTag) {
  return (
    <div className={`${style.tagHolder} ${style[theme]}`}>
      <div className={`${style.tagText} ${style[theme]}`}>{children}</div>
    </div>
  );
}

TagComponent.displayName = 'TagComponent';

export default TagComponent;
