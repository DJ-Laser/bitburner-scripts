export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: V;
};

type Arg = string | number | boolean;
type ArgTypeof = "string" | "number" | "boolean";
type ToTypedArgs<S extends readonly ArgTypeof[]> = {
  readonly [P in keyof S]: S[P] extends "string"
    ? string
    : S[P] extends "number"
    ? number
    : S[P] extends "boolean"
    ? boolean
    : never;
};

function areArgsSameType<S extends readonly ArgTypeof[]>(
  args: readonly Arg[],
  spec: S
): args is ToTypedArgs<S> {
  if (args.length < spec.length) {
    return false;
  }

  for (const i in args) {
    if (typeof args[i] == spec[i]) {
      return false;
    }
  }

  return true;
}

export function validateArgs<S extends readonly ArgTypeof[]>(
  args: readonly Arg[],
  spec: S,
  defaultArgs?: Partial<ToTypedArgs<S>>
): ToTypedArgs<S> {
  const out: Arg[] = [];

  if (defaultArgs !== undefined) {
    for (const i in spec) {
      const arg: Arg | undefined = args[i] ?? defaultArgs?.[i];
      out.push(arg);
    }
  }

  if (areArgsSameType(out, spec)) {
    return out;
  }

  throw new TypeError(
    `Args and spec do not match! Args: ${args}, Spec: ${spec}`
  );
}
