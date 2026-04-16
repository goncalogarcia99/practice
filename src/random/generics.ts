class N {}

type Reference<T extends N | null> = Promise<T>;

class X extends N {}

async function getNullPromise(): Promise<null> {
  return null;
}

async function mainGenerics() {
  // const a: Reference<X> = getNullPromise(); // Incorrect
  const b: Reference<null> = getNullPromise(); // Correct
  // const c: Reference<X> | null = getNullPromise(); // Incorrect
  const d: Reference<X | null> = getNullPromise(); // Correct
}

// https://betterprogramming.pub/extending-typescript-generics-for-additional-type-safety-313f35aca5b3
