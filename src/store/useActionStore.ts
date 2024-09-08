import { create } from "zustand";
import { Order, ActionEvent } from "@/interface/Action";

interface ActionProps<T = any> {
  events: ActionEvent[];
  setView: (prop: string) => void;
  removeView: (prop: string) => void;
  clearView: () => void;

  setModal: (prop: string) => void;
  removeModal: (prop: string) => void;
  clearModal: () => void;

  // order for widgetsx
  order: Record<string, Order[]>;
  setOrder: (prop: string, id: string) => void;

  // Temporary data for widgets
  tempData: Record<string, string | number>;
  setTempData: (prop: Record<string, string | number>) => void;
  clearTempData: () => void;

  // Controll tag state
  flag: boolean;
  setFlag: () => void;
  isOwn: boolean | string;
  setIsOwn: (prop: boolean | string) => void;
  isOwnId: string;
  setIsOwnId: (prop: string) => void;

  // Controll Dark Mode
  isDark: boolean;
  dark: () => void;
  setDark: () => void;

  // stateItems
  items: T[];
  setItems: (prop: T[]) => void;
  updateItem: (prop: T, key: string | string[]) => void;
}

const useActionStore = create<ActionProps>((set) => ({
  events: [],
  setView: (prop) =>
    set((state) => {
      state.setIsOwn(true);
      if (state.events.find(({ event }) => event === prop) !== undefined)
        return state;
      return {
        events: [...state.events, { event: prop, type: "view" }],
      };
    }),
  removeView: (prop) => {
    set((state) => ({
      events: state.events.filter(({ event }) => event !== prop),
    }));
  },
  clearView: () =>
    set((state) => ({
      events: state.events.filter(({ type }) => type !== "view"),
    })),

  order: {},
  setOrder: (id, prop) => {
    set((state) => {
      const currentOrder = state.order[id] ?? [];
      const update = (): Order => {
        const temp = currentOrder.find(({ orderBy }) => orderBy === prop);
        if (temp !== undefined) {
          return {
            ...temp,
            orderHow:
              temp.orderHow === "asc"
                ? "desc"
                : temp.orderHow === "desc"
                ? ""
                : "asc",
          };
        }
        return { orderBy: prop, orderHow: "asc" };
      };
      const updatedOrder = [
        ...currentOrder.filter(({ orderBy }) => orderBy !== prop),
        update(),
      ];
      return {
        order: { ...state.order, [id]: updatedOrder },
      };
    });
  },

  setModal: (prop) =>
    set((state) => ({
      events: [...state.events, { event: prop, type: "modal" }],
    })),
  removeModal: (prop) => {
    set((state) => ({
      events: state.events.filter(({ event }) => event !== prop),
    }));
  },
  clearModal: () =>
    set((state) => ({
      events: state.events.filter(({ type }) => type !== "modal"),
    })),

  tempData: {},
  setTempData: (prop) =>
    set((state) => ({ tempData: { ...state.tempData, ...prop } })),
  clearTempData: () => set({ tempData: {} }),

  flag: false,
  setFlag: () => set((state) => ({ flag: !state.flag })),

  isOwn: false,
  setIsOwn: (prop) => set({ isOwn: prop }),
  isOwnId: "",
  setIsOwnId: (prop) => set({ isOwnId: prop }),

  isDark: false,
  dark: () => set(() => ({ isDark: true })),
  setDark: () => set((state) => ({ isDark: !state.isDark })),

  items: [],
  setItems: (prop) => set({ items: prop }),
  updateItem: (item, key) =>
    set((state) => ({
      items: state.items.map((prevItem) => {
        if (typeof key === "string")
          return prevItem.id === item.id
            ? { ...prevItem, [key]: item[key] }
            : prevItem;
        return prevItem.id === item.id
          ? {
              ...prevItem,
              ...key.reduce((acc, cur) => ({ ...acc, [cur]: item[cur] }), {}),
            }
          : prevItem;
      }),
    })),
}));
export default useActionStore;
