export const throwError = (message: string): never => {
  throw new Error(message);
};

export const throwHttpError = (status: number, message: string): never => {
  throw new Error(`${status}: ${message}`);
};
