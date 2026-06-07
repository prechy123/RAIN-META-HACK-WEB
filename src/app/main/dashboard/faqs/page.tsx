"use client";

import { useMemo, useState } from "react";
import { Pencil, Trash2, Sparkles } from "lucide-react";
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
import type { FAQ } from "@/services/authService";
import { fieldInputClass, fieldTextareaClass } from "@/components/onboarding/Field";

export default function FaqsPage() {
  const { business, updateBusiness } = useBusiness();
  const faqs = useMemo(() => business.faqs ?? [], [business.faqs]);

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditIndex(null);
    setQuestion("");
    setAnswer("");
    setOpen(true);
  };

  const openEdit = (index: number) => {
    setEditIndex(index);
    setQuestion(faqs[index].question);
    setAnswer(faqs[index].answer);
    setOpen(true);
  };

  const persist = async (next: FAQ[], message: string) => {
    setSaving(true);
    const ok = await updateBusiness({ faqs: next }, message);
    setSaving(false);
    return ok;
  };

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) return;
    const entry: FAQ = { question: question.trim(), answer: answer.trim() };
    const next =
      editIndex !== null
        ? faqs.map((f, i) => (i === editIndex ? entry : f))
        : [...faqs, entry];
    const ok = await persist(
      next,
      editIndex !== null ? "FAQ updated" : "FAQ added",
    );
    if (ok) setOpen(false);
  };

  const handleDelete = async (index: number) => {
    await persist(faqs.filter((_, i) => i !== index), "FAQ deleted");
  };

  // Lightweight suggestions derived from existing business info.
  const suggestions = useMemo(() => {
    const existing = new Set(faqs.map((f) => f.question.toLowerCase()));
    const candidates: FAQ[] = [];
    if (business.businessPhone || business.businessEmailAddress) {
      candidates.push({
        question: "How can I contact you?",
        answer: [
          business.businessPhone && `Call us on ${business.businessPhone}`,
          business.businessEmailAddress &&
            `email ${business.businessEmailAddress}`,
        ]
          .filter(Boolean)
          .join(" or "),
      });
    }
    if (business.businessOpenHours) {
      candidates.push({
        question: "What are your business hours?",
        answer: `We are open ${business.businessOpenHours}.`,
      });
    }
    if (business.businessAddress) {
      candidates.push({
        question: "Where are you located?",
        answer: `We are located at ${business.businessAddress}.`,
      });
    }
    if (business.businessWebsite) {
      candidates.push({
        question: "Do you have a website?",
        answer: `Yes, visit us at ${business.businessWebsite}.`,
      });
    }
    return candidates.filter((c) => !existing.has(c.question.toLowerCase()));
  }, [business, faqs]);

  const addSuggestion = async (faq: FAQ) => {
    await persist([...faqs, faq], "FAQ added");
  };

  return (
    <div className="px-1 sm:px-2">
      <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">FAQs({faqs.length})</h2>
          <Button
            type="button"
            onClick={openAdd}
            className="rounded-lg bg-brand px-6 font-semibold text-ink hover:bg-brand-hover"
          >
            Add FAQ
          </Button>
        </div>

        {faqs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink/15 px-4 py-10 text-center">
            <p className="font-medium text-ink">No FAQs yet</p>
            <p className="mt-1 text-sm text-ink-soft">
              Add common questions your customers usually ask
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 rounded-xl border border-ink/10 p-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{faq.question}</p>
                  <p className="mt-0.5 text-sm text-ink-soft">{faq.answer}</p>
                </div>
                <div className="flex shrink-0 gap-3 text-ink-soft">
                  <button
                    type="button"
                    onClick={() => openEdit(index)}
                    aria-label="Edit FAQ"
                    className="hover:text-ink"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    aria-label="Delete FAQ"
                    className="hover:text-red-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-brand-ink" />
              <h3 className="font-bold text-ink">AI Suggestion</h3>
            </div>
            <p className="mt-1 text-sm text-ink-soft">
              Based on your business info, here are some suggested FAQ
            </p>
            <div className="mt-3 space-y-3">
              {suggestions.map((s) => (
                <div
                  key={s.question}
                  className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 p-4"
                >
                  <p className="min-w-0 font-medium text-ink">{s.question}</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addSuggestion(s)}
                    className="shrink-0 rounded-lg border-brand/40 px-6 font-semibold text-brand-ink hover:bg-brand-soft"
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="text-ink">
              {editIndex !== null ? "Edit FAQ" : "Add FAQ"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[15px] font-medium text-ink">
                Question
              </label>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What is your question?"
                className={fieldInputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[15px] font-medium text-ink">Answer</label>
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide the answer"
                className={fieldTextareaClass}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleSave}
                disabled={saving || !question.trim() || !answer.trim()}
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
