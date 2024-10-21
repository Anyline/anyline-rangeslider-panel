import { getTemplateSrv } from '@grafana/runtime';
import { isValidVariable } from './utils/isValidVariable';

export const debouncedVariableCheck = (
  variableName: string,
  onSuccess: (variableValue: string) => void,
  onError: () => void,
  interval = 1000,
  maxDuration = 3000
) => {
  let elapsed = 0;

  const checkVariable = () => {
    const variable = getTemplateSrv()
      .getVariables()
      .find((v) => v.name === variableName);

    if (isValidVariable(variable)) {
      onSuccess(variable.current.value);
    } else {
      elapsed += interval;
      if (elapsed < maxDuration) {
        setTimeout(checkVariable, interval);
      } else {
        onError();
      }
    }
  };

  checkVariable();
};
