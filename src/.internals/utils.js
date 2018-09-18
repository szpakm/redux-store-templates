export const warn = message =>
  (console.warn || Function.prototype)("redux-store-templates: " + message);

export const readAsArray = data => {
  return Array.isArray(data) ? data : [data];
};
