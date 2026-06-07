import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "./Field";
import { productDraftSchema, toFieldErrors } from "@/lib/validations";
import type { Item } from "./types";

interface StepProductsProps {
  items: Item[];
  onChange: (items: Item[]) => void;
}

export default function StepProducts({ items, onChange }: StepProductsProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setName("");
    setPrice("");
    setDescription("");
    setEditIndex(null);
    setErrors({});
  };

  const handleAdd = () => {
    const result = productDraftSchema.safeParse({ name, price, description });
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return;
    }
    const entry: Item = {
      name: result.data.name,
      price: parseFloat(result.data.price),
      description: result.data.description?.trim() ?? "",
    };
    if (editIndex !== null) {
      const next = [...items];
      next[editIndex] = entry;
      onChange(next);
    } else {
      onChange([...items, entry]);
    }
    reset();
  };

  const handleEdit = (index: number) => {
    setName(items[index].name);
    setPrice(String(items[index].price));
    setDescription(items[index].description ?? "");
    setEditIndex(index);
    setErrors({});
  };

  const handleDelete = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
    if (editIndex === index) reset();
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-ink">Products/Services</h3>

      <Field label="Product name" error={errors.name}>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((p) => ({ ...p, name: "" }));
          }}
          placeholder="What is the product name"
          aria-invalid={!!errors.name}
          className={inputClass(errors.name)}
        />
      </Field>

      <Field label="Price" error={errors.price}>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            if (errors.price) setErrors((p) => ({ ...p, price: "" }));
          }}
          placeholder="enter the price of the product"
          aria-invalid={!!errors.price}
          className={inputClass(errors.price)}
        />
      </Field>

      <Field label="Description" error={errors.description}>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the product or service"
          className={textareaClass(errors.description)}
        />
      </Field>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleAdd}
          className="rounded-lg bg-brand px-8 font-semibold text-ink hover:bg-brand-hover"
        >
          {editIndex !== null ? "Update" : "Add"}
        </Button>
      </div>

      <div>
        <h4 className="mb-3 text-lg font-bold text-ink">Your Product(s)</h4>
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink/15 px-4 py-8 text-center">
            <p className="font-medium text-ink">
              You haven&apos;t added any Products or services yet
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Add your Products or services to train the AI about your business
              offerings
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 rounded-xl border border-ink/10 p-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-ink">{item.name}</p>
                    <span className="text-sm font-medium text-brand-ink">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                  {item.description && (
                    <p className="mt-0.5 text-sm text-ink-soft">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-3 text-ink-soft">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    aria-label="Edit product"
                    className="hover:text-ink"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    aria-label="Delete product"
                    className="hover:text-red-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
