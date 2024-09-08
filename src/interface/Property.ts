import { Dispatch, SetStateAction } from "react";

/**
 * State type for the React component
 * @template T
 * @description - State type for the component
 * @property {T} 0 - State value
 * @property {Dispatch<SetStateAction<T>>} 1 - State setter
 * @example
 * const [state, setState] = useState<T>(initialState);
 * @typedef {Array<T, Dispatch<SetStateAction<T>>>} State
 */
export type StateAction<T> = Dispatch<SetStateAction<T>>;
export type State<T> = [T, StateAction<T>];
