"use client";

import { useMemo, useState } from "react";
import { Pencil, Trash2, ImageOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/providers/BusinessProvider";
import type { Item } from "@/services/authService";
import {
  fieldInputClass,
  fieldTextareaClass,
} from "@/components/onboarding/Field";

export default function ProductsPage() {
  const { business, updateBusiness } = useBusiness();
  const items = useMemo(() => business.items ?? [], [business.items]);

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditIndex(null);
    setName("");
    setPrice("");
    setDescription("");
    setOpen(true);
  };

  const openEdit = (index: number) => {
    setEditIndex(index);
    setName(items[index].name);
    setPrice(String(items[index].price));
    setDescription(items[index].description ?? "");
    setOpen(true);
  };

  const persist = async (next: Item[], message: string) => {
    setSaving(true);
    const ok = await updateBusiness({ items: next }, message);
    setSaving(false);
    return ok;
  };

  const canSave = name.trim() !== "" && parseFloat(price) > 0;

  const handleSave = async () => {
    if (!canSave) return;
    const entry: Item = {
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
    };
    const next =
      editIndex !== null
        ? items.map((it, i) => (i === editIndex ? entry : it))
        : [...items, entry];
    const ok = await persist(
      next,
      editIndex !== null ? "Product updated" : "Product added",
    );
    if (ok) setOpen(false);
  };

  const handleDelete = async (index: number) => {
    await persist(items.filter((_, i) => i !== index), "Product deleted");
  };

  return (
    <div className="px-1 sm:px-2">
      <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">Products/Services</h2>
          <Button
            type="button"
            onClick={openAdd}
            className="rounded-lg bg-brand px-6 font-semibold text-ink hover:bg-brand-hover"
          >
            Add
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink/15 px-4 py-10 text-center">
            <p className="font-medium text-ink">No products or services yet</p>
            <p className="mt-1 text-sm text-ink-soft">
              Add your products or services to train the AI
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-ink/10 p-3"
              >
                <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-ink-soft">
                  <ImageOff className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="mt-0.5 text-sm text-ink-soft">
                    {item.description || "No description"}
                  </p>
                </div>
                <span className="shrink-0 font-semibold text-brand-ink">
                  ${item.price}
                </span>
                <div className="flex shrink-0 gap-3 text-ink-soft">
                  <button
                    type="button"
                    onClick={() => openEdit(index)}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="text-ink">
              {editIndex !== null ? "Edit Product/Service" : "Products/Services"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[15px] font-medium text-ink">
                Product/Services name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="enter a product/Service"
                className={fieldInputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[15px] font-medium text-ink">Price</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="enter the price"
                className={fieldInputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[15px] font-medium text-ink">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the product or service"
                className={fieldTextareaClass}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleSave}
                disabled={saving || !canSave}
                className="rounded-lg bg-brand px-8 font-semibold text-ink hover:bg-brand-hover disabled:opacity-50"
              >
                {saving ? "Saving..." : editIndex !== null ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
