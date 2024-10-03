import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'url',
    label: 'Upload URL',
    type: ESetting.TEXT_FIELD,
    defaultValue: '',
  },
  {
    key: 'allowedFileTypes',
    label: 'Allowed File Types',
    type: ESetting.SELECT,
    defaultValue: '*',
    options: [
      { label: 'All', value: '*' },
      { label: 'Images', value: 'image/*' },
      { label: 'Video', value: 'video/*' },
      { label: 'Audio', value: 'audio/*' },
      { label: 'Documents', value: 'application/*' },
      { label: 'Text', value: 'text/*' },
      { label: 'PDF', value: 'application/pdf' },
      { label: 'ZIP', value: 'application/zip' },
    ],
  },
  {
    key: 'fileLimit',
    label: 'File Limit',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 0,
  },
  {
    key: 'fileSizeLimit',
    label: 'File Size Limit',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 0,
  },
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...load(DEFAULT_SETTINGS).filter('datasource'),
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
