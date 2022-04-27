export type Truth = boolean

export type TruthResolver<T> = (self: T, ...args: any[]) => boolean

export type TruthOrResolver<T> = Truth | TruthResolver<T>
