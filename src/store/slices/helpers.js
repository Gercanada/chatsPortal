export const detectChanges = (initialData, newData) => {
  const changes = {};
  for (const key in initialData) {
    if (newData[key] && initialData[key] !== newData[key]) {
      if (typeof initialData[key] === 'object') {
        if (initialData[key]?.id !== newData[key]) {
          changes[key] = newData[key];
        }
      } else {
        changes[key] = newData[key];
      }
    }
  }
  return changes;
};
