export function debounce(callback: Function, wait: number) {
  let timeoutId: any = null;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}
