export default function findMinAndMaxValues(variableValue: string | null) {
    const regex = /^.*?(\d+).*?(\d+)[^\d]*$/;
    const matches = variableValue?.match(regex);

    if (matches && matches.length >= 3) {
        return { minValue: matches[1].toString(), maxValue: matches[2].toString() };
    } else {
        return { minValue: "25", maxValue: "75" };
    }
}
