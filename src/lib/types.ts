export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: any;
};

export namespace args {
  type Arg = string | number | boolean;

  export function toNumber(arg: Arg): number | undefined {
    switch (typeof arg) {
      case "string":
        return parseFloat(arg);
      case "number":
        return arg;
      case "boolean":
        return arg ? 1 : 0;
      case "undefined":
        return undefined;
    }
  }

  export function toString(arg: Arg): string | undefined {
    switch (typeof arg) {
      case "string":
        return arg;
      case "number":
        return arg.toString();
      case "boolean":
        return arg.toString();
      case "undefined":
        return undefined;
    }
  }
}
