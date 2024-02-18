export class CustomError extends Error {
  status!: number;
  message!: string;
}
