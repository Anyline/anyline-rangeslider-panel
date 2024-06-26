import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import SimplePanel from './components/SimplePanel';
import { getTemplateSrv } from '@grafana/runtime';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addSelect({
      path: 'variableName',
      name: 'Variable Name',
      description: 'The name of the variable to update',
      settings: {
        options: getTemplateSrv()
          .getVariables()
          .filter((e) => e.type === 'textbox')
          .map((e) => {
            return {
              label: e.name,
              value: e.name,
            };
          }),
      },
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
      path: 'rangePrefix',
      name: 'Range Prefix',
      description: 'Prefix for the range (e.g., "[" for lucene queries)',
    })
    .addTextInput({
      path: 'rangeSuffix',
      name: 'Range Suffix',
      description: 'Suffix for the range (e.g., "]" for lucene queries)',
    })
    .addTextInput({
      path: 'rangeDelimiter',
      name: 'Range Delimiter',
      description: 'Delimiter for the range (e.g., "TO" for lucene queries)',
    })
    .addBooleanSwitch({
      path: 'delimiterSpace',
      name: 'Space before and after the delimiter',
      description: 'Toggle to add/remove space before and after the delimiter',
      defaultValue: true,
    });
});
