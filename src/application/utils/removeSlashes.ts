export const removeSlashes = (value: string): string => {
    if (!value || value?.length === 0) {
        return value;
    }
    return value.replaceAll("_", " ");
}