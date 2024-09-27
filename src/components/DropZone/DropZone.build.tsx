import { useDatasourceSub, useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';

import { IDropZoneProps } from './DropZone.config';

const DropZone: FC<IDropZoneProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  useDatasourceSub();

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <p>Drag & drop files here, or click to select files</p>
    </div>
  );
};

export default DropZone;
