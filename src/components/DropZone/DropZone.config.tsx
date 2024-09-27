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
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      declarations: [{ key: 'datasource', iterable: true }],
    },
  },
  defaultProps: {
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
  name?: string;
}
