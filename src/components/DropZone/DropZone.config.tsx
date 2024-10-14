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
    datasources: {},
  },
  defaultProps: {
    allowedFileTypes: '*',
    fileLimit: 0,
    fileSizeLimit: 0,
    style: {
      boxShadow: '4px 4px 30px rgba(0, 0, 0, .2)',
      backgroundColor: 'rgba(0, 110, 255, 0.041)',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '10px',
      paddingRight: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'space-between',
      gap: '5px',
      height: '300px',
      width: '300px',
      cursor: 'pointer',
      borderRadius: '10px',
    },
  },
} as T4DComponentConfig<IDropZoneProps>;

export interface IDropZoneProps extends webforms.ComponentProps {
  url?: string;
  allowedFileTypes?: string;
  fileLimit?: number;
  fileSizeLimit?: number;
}
