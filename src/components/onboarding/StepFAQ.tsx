import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "./Field";
import { faqDraftSchema, toFieldErrors } from "@/lib/validations";
import type { FAQ } from "./types";

interface StepFAQProps {
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
}

export default function StepFAQ({ faqs, onChange }: StepFAQProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setQuestion("");
    setAnswer("");
    setEditIndex(null);
    setErrors({});
  };

  const handleAdd = () => {
    const result = faqDraftSchema.safeParse({ question, answer });
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return;
    }
    const entry: FAQ = result.data;
    if (editIndex !== null) {
      const next = [...faqs];
      next[editIndex] = entry;
      onChange(next);
    } else {
      onChange([...faqs, entry]);
    }
    reset();
  };

  const handleEdit = (index: number) => {
    setQuestion(faqs[index].question);
    setAnswer(faqs[index].answer);
    setEditIndex(index);
    setErrors({});
  };

  const handleDelete = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index));
    if (editIndex === index) reset();
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-ink">FAQ</h3>

      <Field label="Question" error={errors.question}>
        <Input
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (errors.question)
              setErrors((p) => ({ ...p, question: "" }));
          }}
          placeholder="What is your question?"
          aria-invalid={!!errors.question}
          className={inputClass(errors.question)}
        />
      </Field>

      <Field label="Answer" error={errors.answer}>
        <Textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            if (errors.answer) setErrors((p) => ({ ...p, answer: "" }));
          }}
          placeholder="Provide the answer"
          aria-invalid={!!errors.answer}
          className={textareaClass(errors.answer)}
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
        <h4 className="mb-3 text-lg font-bold text-ink">Your FAQ</h4>
        {faqs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink/15 px-4 py-8 text-center">
            <p className="font-medium text-ink">
              You haven&apos;t added any FAQs yet
            </p>
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
                    onClick={() => handleEdit(index)}
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
      </div>
    </div>
  );
}
