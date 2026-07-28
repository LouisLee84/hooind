export function createStorageKey(
  contentType: string,
  contentId: string,
  dataName: string,
) {
  return `hooind.${contentType}.${contentId}.${dataName}`;
}
