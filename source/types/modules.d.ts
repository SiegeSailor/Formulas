declare module "random-bigint" {
  export default (
    bits: number,
    callback?: (error: Error, output: bigint) => void
  ) => BigInt();
}
