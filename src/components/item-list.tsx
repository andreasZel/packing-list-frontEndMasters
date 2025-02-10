import { useContext, useState } from 'react';
import { filterItems } from '../lib/items';
import { toKebabCase } from '../lib/kebab-case';
import Item from './item';
import { ItemsContext } from '../lib/ItemsContext';

const EmptyState = ({ id, items, filteredItems }: { id: string, items: Item[], filteredItems: Item[] }) => (
  <p id={id} className="text-primary-400">
    (No items.)
  </p>
);

const ItemList = ({ title = 'Items', items }: { title: string, items: Item[] }) => {
  const [filter, setFilter] = useState('');
  const id = toKebabCase(title);

  const filteredItems = filterItems(items, { name: filter });
  const isEmpty = !items.length;

  const { update, remove } = useContext(ItemsContext);


  return (
    <section id={id} className="w-full p-4 border-2 border-primary-200">
      <header className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <label htmlFor={`${id}-filter`} className="hidden"></label>
        <input
          id={`${id}-filter`}
          placeholder="Filter"
          className="w-full py-1 my-2"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </header>
      <ul className="flex flex-col gap-2">
        {filteredItems.map((item) => (
          <Item key={item.id} item={item} update={update} remove={remove} />
        ))}
      </ul>
      {isEmpty && (
        <EmptyState
          id={`${id}-empty-state`}
          items={items}
          filteredItems={filteredItems}
        />
      )}
    </section>
  );
};

export default ItemList;
