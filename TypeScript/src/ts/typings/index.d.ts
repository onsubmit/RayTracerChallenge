export {};
declare global {
  interface Number {
    compare(received: number, epsilon?: number): boolean;
  }
}
