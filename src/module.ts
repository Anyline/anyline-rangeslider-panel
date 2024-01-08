import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import SimplePanel from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'variableName',
      name: 'Variable Name',
      description: 'The name of the variable to update',
      defaultValue: 'myFirstVariable',
    })
    .addTextInput({
      path: 'variableLabel',
      name: 'Variable Label',
      description: 'The user-friendly label of the variable',
      defaultValue: 'My First Variable',
    })
    .addTextInput({
      path: 'variableMinimumThreshold',
      name: 'Minimum threshold',
      defaultValue: '0',
    })
    .addTextInput({
      path: 'variableMaximumThreshold',
      name: 'Maximum threshold',
      defaultValue: '100',
    })
    .addTextInput({
      path: 'variableDefaultMinimumValue',
      name: 'Default minimum value',
      defaultValue: '80',
    })
    .addTextInput({
      path: 'variableDefaultMaximumValue',
      name: 'Default maximum value',
      defaultValue: '100',
    })
    .addTextInput({
      path: 'rangePrefix',
      name: 'Range Prefix',
      description: 'Prefix for the range (e.g., "[" for lucene queries)',
      defaultValue: '[',
    })
    .addTextInput({
      path: 'rangeSuffix',
      name: 'Range Suffix',
      description: 'Suffix for the range (e.g., "]" for lucene queries)',
      defaultValue: ']',
    })
    .addTextInput({
      path: 'rangeDelimiter',
      name: 'Range Delimiter',
      description: 'Delimiter for the range (e.g., "TO" for lucene queries)',
      defaultValue: 'TO',
    });
});
