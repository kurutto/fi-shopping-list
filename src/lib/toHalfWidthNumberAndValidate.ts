export const toHalfWidthNumber = (input: string) =>
  input.replace(/[０-９]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );

export const validateHalfWidthNumber = (value: string, onError: () => void) => {
  const ok = /^\d+$/.test(value);
  if (!ok) onError();
  return ok;
};
