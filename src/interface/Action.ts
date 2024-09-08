export interface ActionEvent {
  event: string;
  type: "view" | "modal";
}

type Action<T extends boolean | string | null | undefined> = [
  T,
  React.ReactNode
];
export type Show = Action<boolean | string>;
export type Replace = Action<boolean | string | null | undefined>;
export interface ShowAction {
  event: string;
  isVisible: boolean;
}

export interface ActionProps {
  replaces?: Replace[];
  shows?: Show[];
}

export interface Order {
  orderBy: string;
  orderHow: "asc" | "desc" | "";
}
