import { memo } from "react";
import { InputBlock, Input } from "@/components/shared/TextInput";
import { Button_v2 } from "@/components/shared/Button";

interface FAQ {
  question: string;
  answer: string;
}

interface Step5Props {
  faqs: FAQ[];
  onUpdateFAQ: (
    index: number,
    field: "question" | "answer",
    value: string
  ) => void;
  onAddFAQ: () => void;
  onRemoveFAQ: (index: number) => void;
}

const Step5 = memo(
  ({ faqs, onUpdateFAQ, onAddFAQ, onRemoveFAQ }: Step5Props) => {
    return (
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">FAQs</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-2 border-b pb-4 mb-4">
            <div>
              <p className="mb-2">Question {index + 1}</p>
              <InputBlock variant="neubrutalism" size="lg">
                <Input
                  placeholder="Do you offer home delivery in Lagos?"
                  value={faq.question}
                  onChange={(e) =>
                    onUpdateFAQ(index, "question", e.target.value)
                  }
                  className="outline-none border-none focus:outline-none focus:ring-0"
                />
              </InputBlock>
            </div>
            <div>
              <p className="mb-2">Answer</p>
              <InputBlock variant="neubrutalism" size="lg">
                <Input
                  placeholder="Yes, we deliver to Lekki, Victoria Island, and Ikoyi areas..."
                  value={faq.answer}
                  onChange={(e) => onUpdateFAQ(index, "answer", e.target.value)}
                  className="w-full p-2 outline-none border-none focus:outline-none focus:ring-0 bg-transparent"
                  //   rows={2}
                />
              </InputBlock>
            </div>
            {faqs.length > 1 && (
              <button
                onClick={() => onRemoveFAQ(index)}
                className="text-red-500 text-sm"
              >
                Remove FAQ
              </button>
            )}
          </div>
        ))}
        <Button_v2 onClick={onAddFAQ} className="w-full">
          Add FAQ
        </Button_v2>
      </div>
    );
  }
);

Step5.displayName = "Step5";

export default Step5;
