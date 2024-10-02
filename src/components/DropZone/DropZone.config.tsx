import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineCloudUpload } from 'react-icons/md';

import DropZoneSettings, { BasicSettings } from './DropZone.settings';

export default {
  craft: {
    displayName: 'DropZone',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(DropZoneSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'DropZone',
    exposed: true,
    icon: MdOutlineCloudUpload,
    events: [
      {
        label: 'On Upload',
        value: 'onupload',
      },
      {
        label: 'On Upload Success',
        value: 'onuploadsuccess',
      },
      {
        label: 'On Upload Failure',
        value: 'onuploadfailure',
      },
      {
        label: 'On File Select',
        value: 'onfileselect',
      },
      {
        label: 'On File Remove',
        value: 'onfileremove',
      },
    ],
    datasources: {
      declarations: [{ key: 'datasource', iterable: true }],
    },
  },
  defaultProps: {
    allowedFileTypes: '*',
    fileLimit: 0,
    style: {
      paddingTop: '20px',
      paddingBottom: '20px',
      paddingLeft: '20px',
      paddingRight: '20px',
      color: '#4096ff',
      textAlign: 'center',
      cursor: 'pointer',
      borderWidth: '1px',
      borderColor: '#4096ff',
      borderStyle: 'dashed',
      borderRadius: '10px',
    },
  },
} as T4DComponentConfig<IDropZoneProps>;

export interface IDropZoneProps extends webforms.ComponentProps {
  url?: string;
  allowedFileTypes?: string;
  fileLimit?: number;
}
