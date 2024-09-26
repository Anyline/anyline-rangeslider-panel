import { getTemplateSrv } from '@grafana/runtime';

export const debouncedVariableCheck = (
  variableName: string,
  onSuccess: (variableValue: string) => void,
  onError: () => void,
  interval = 1000,
  maxDuration = 5000
) => {
  let elapsed = 0;

  const checkVariable = () => {
    const variable = getTemplateSrv()
      .getVariables()
      .find((v) => v.name === variableName && (v as any).current?.value);

    if (variable && 'current' in variable) {
      onSuccess(variable.current.value as string);
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
