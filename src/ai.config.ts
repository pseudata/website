export const excludedAIPaths = ["contributing/**"];

export function isExcluded(id: string) {
  return excludedAIPaths.some((pattern) => {
    const prefix = pattern.replace(/\/\*\*$/, "");
    return id.startsWith(prefix);
  });
}
