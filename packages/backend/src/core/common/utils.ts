import { Observable, Observer } from 'rxjs';
import { isNaN } from 'lodash';
/**
 *
 * @description
 *  Returns a observable wich executes a async work function and completes
 * with the returned values. This is useful in methods wich need to resturn an observable
 * but also want to work with async (Promise-returning) code.
 *
 */
export function asyncObservable<T>(
  work: (observer: Observer<T>) => Promise<T>,
): Observable<T> {
  return new Observable((suscriber) => {
    (async () => {
      try {
        const result = await work(suscriber);
        if (result) {
          suscriber.next(result);
        }
        suscriber.complete();
      } catch (error) {
        suscriber.error(error);
      }
    })();
  });
}

export const allPropsAreEmpty = (filters: { [key: string]: unknown }) => {
  return Object.values(filters).every((val) => {
    if (typeof val == 'undefined' || isNaN(val)) {
      return true;
    }
    return false;
  });
};
export type Paginate = { limit?: number; skip?: number };

export type Props<T> = { [key in keyof T]?: any } & Paginate;

const handleSizeArr =
  <T extends unknown>(arr: T[]) =>
  (skip: number, limit: number) => {
    return arr.slice(skip, limit);
  };

export function assertProps<T>(arr: T[]) {
  return ({ limit, skip, ...props }: Props<T>) => {
    if (allPropsAreEmpty(props)) return arr;
    return handleSizeArr(arr)(skip, limit).filter((can) => {
      return Object.keys(props).every((d) => {
        if (typeof props[d] == 'function') {
          return props[d](can[d]);
        }
        return can[d] === props[d];
      });
    });
  };
}

/**
 *
 * @param arguments arrar of conditions
 * @returns if all conditions are true
 * @description this method ..
 */
export const andIn = <Conditions extends boolean[]>(...source: Conditions) => {
  if (source.length == 1 && typeof source[0] == 'boolean') {
    return source;
  }
  if (typeof source == 'object') {
    return source.every(Boolean);
  }
};
export const orIn = <Conditions extends boolean[]>(...source: Conditions) => {
  if (source.length == 1 && typeof source[0] == 'boolean') {
    return source;
  }
  if (typeof source == 'object') {
    return source.some(Boolean);
  }
};
/**
 * Returns a predicate function which returns true if the item is found in the set,
 * as determined by a === equality check on the given compareBy property
 */

export function foundIn<T>(set: T[], compareBy: keyof T) {
  return (item: T) => set.some((t) => t[compareBy] === item[compareBy]);
}
