export function* idMaker(base: number): Generator<number, null, number> {
  let d = base;
  while (true) {
    const res = yield d;
    if (res) {
      d = res;
      continue;
    }
    ++d;
  }
}
