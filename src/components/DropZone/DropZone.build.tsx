import {
  selectResolver,
  useDatasourceSub,
  useEnhancedEditor,
  useEnhancedNode,
} from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import './DropZone.css';
import { IDropZoneProps } from './DropZone.config';
import { Element } from '@ws-ui/craftjs-core';
const DropZone: FC<IDropZoneProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  useDatasourceSub();
  const { resolver } = useEnhancedEditor(selectResolver);

  console.log();

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div className="dropZoneHeader">
        <Element
          style={{ fontSize: '100px' }}
          id={`dropZoneHeader`}
          role="dropZoneHeader"
          is={resolver.Icon}
          icon="fa-cloud-arrow-up"
          deletable={false}
          canvas
        />
        <p>Drag & drop files here, or click to select files</p>
      </div>
      <div className="dropZoneFooter">
        <p>Not selected file</p>
        <Element
          id={`dropZoneDelete`}
          role="dropZoneDelete"
          is={resolver.Icon}
          icon="fa-trash"
          deletable={false}
          canvas
        />
      </div>
      <div className="dropZoneButton">
        <Element
          style={{
            width: '100%',
            backgroundColor: 'royalblue',
            color: 'white',
            boxShadow: '0 2px 30px rgba(0, 0, 0, 0.205)',
          }}
          id={`dropZoneButton`}
          role="dropZoneButton"
          text="Upload"
          is={resolver.Button}
          deletable={false}
          canvas
        />
      </div>
    </div>
  );
};

export default DropZone;
