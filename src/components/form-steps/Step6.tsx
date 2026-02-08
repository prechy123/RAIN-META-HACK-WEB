import { memo } from "react";
import { InputBlock, Input } from "@/components/shared/TextInput";
import { Button_v2 } from "@/components/shared/Button";

interface Item {
  name: string;
  price: number;
  description?: string;
}

interface Step6Props {
  items: Item[];
  onUpdateItem: (
    index: number,
    field: keyof Item,
    value: string | number,
  ) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

const Step6 = memo(
  ({ items, onUpdateItem, onAddItem, onRemoveItem }: Step6Props) => {
    return (
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Menu Items</h3>
        {items.map((item, index) => (
          <div key={index} className="space-y-2 border-b pb-4 mb-4">
            <div>
              <p className="mb-2">Item Name</p>
              <InputBlock variant="neubrutalism" size="lg">
                <Input
                  placeholder="Jollof Rice with Grilled Chicken"
                  value={item.name}
                  onChange={(e) => onUpdateItem(index, "name", e.target.value)}
                  className="outline-none border-none focus:outline-none focus:ring-0"
                />
              </InputBlock>
            </div>
            <div>
              <p className="mb-2">Price</p>
              <InputBlock variant="neubrutalism" size="lg">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="3500"
                  value={item.price || 0}
                  onChange={(e) => {
                    onUpdateItem(index, "price", e.target.value);
                  }}
                  className="outline-none border-none focus:outline-none focus:ring-0"
                />
              </InputBlock>
            </div>
            <div>
              <p className="mb-2">Description</p>
              <InputBlock variant="neubrutalism" size="lg">
                <Input
                  placeholder="Signature party jollof rice served with well-seasoned grilled chicken..."
                  value={item.description}
                  onChange={(e) =>
                    onUpdateItem(index, "description", e.target.value)
                  }
                  className="w-full p-2 outline-none border-none focus:outline-none focus:ring-0 bg-transparent"
                  //   rows={2}
                />
              </InputBlock>
            </div>
            {items.length > 1 && (
              <button
                onClick={() => onRemoveItem(index)}
                className="text-red-500 text-sm"
              >
                Remove Item
              </button>
            )}
          </div>
        ))}
        <Button_v2 onClick={onAddItem} className="w-full">
          Add Item
        </Button_v2>
      </div>
    );
  },
);

Step6.displayName = "Step6";

export default Step6;
