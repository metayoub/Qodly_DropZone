import config, { IDropZoneProps } from './DropZone.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './DropZone.build';
import Render from './DropZone.render';

const DropZone: T4DComponent<IDropZoneProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

DropZone.craft = config.craft;
DropZone.info = config.info;
DropZone.defaultProps = config.defaultProps;

export default DropZone;
