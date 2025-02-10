import { createContext, PropsWithChildren, useState } from "react";
import { createItem, filterItems, getInitialItems, removeItem, updateItem } from "./items";

type ItemState = {
    items: Item[];
    add: (name: string) => void;
    update: (id: string, updates: any) => void;
    remove: (id: string) => void;
    markAllAsUnpacked: () => void;
    unpackedItems: Item[];
    packedItems: Item[];
}

export const ItemsContext = createContext({} as ItemState);

export const ItemsProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState(() => getInitialItems())

    const add = (name: string) => {
        const item = createItem(name);
        setItems([...items, item]);
    };

    const update = (id: string, updates: any) => {
        setItems(updateItem(items, id, updates));
    };

    const remove = (id: string) => {
        setItems(removeItem(items, id));
    };

    const unpackedItems = filterItems(items, { packed: false });
    const packedItems = filterItems(items, { packed: true });

    const markAllAsUnpacked = () => {
        return setItems(items.map((item) => ({ ...item, packed: false })));
    };

    const value = {
        items,
        add,
        update,
        remove,
        markAllAsUnpacked,
        unpackedItems,
        packedItems
    }

    return (
        <ItemsContext.Provider value={value}>
            {children}
        </ItemsContext.Provider>
    )
}

