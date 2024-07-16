import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import SimplePanel from './components/SimplePanel';
import { getTemplateSrv } from '@grafana/runtime';
import {
  DEFAUT_DELIMITER,
  DEFAULT_MAX_THRESHOLD,
  DEFAULT_MIN_THRESHOLD,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
} from 'components/constants';

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
    .addNumberInput({
      path: 'variableMinimumThreshold',
      name: 'Minimum threshold',
      description: 'Defaults to 0',
      defaultValue: DEFAULT_MIN_THRESHOLD,
    })
    .addNumberInput({
      path: 'variableMaximumThreshold',
      name: 'Maximum threshold',
      description: 'Defaults to 100',
      defaultValue: DEFAULT_MAX_THRESHOLD,
    })
    .addTextInput({
      path: 'rangePrefix',
      name: 'Range Prefix',
      description: 'Defaults to "["',
      defaultValue: DEFAULT_PREFIX,
    })
    .addTextInput({
      path: 'rangeSuffix',
      name: 'Range Suffix',
      description: 'Defaults to "]"',
      defaultValue: DEFAULT_SUFFIX,
    })
    .addTextInput({
      path: 'rangeDelimiter',
      name: 'Range Delimiter',
      description: 'Defaults to "TO"',
      defaultValue: DEFAUT_DELIMITER,
    })
    .addBooleanSwitch({
      path: 'shouldHaveDelimiterSpace',
      name: 'Space before and after the delimiter',
      description: 'Adds space by default, toogle to remove space',
      defaultValue: true,
    });
});
