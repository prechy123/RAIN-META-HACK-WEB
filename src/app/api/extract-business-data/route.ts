import { NextRequest, NextResponse } from "next/server";

interface FAQ {
  question: string;
  answer: string;
}

interface Item {
  name: string;
  price: number;
  description?: string;
}

interface ExtractedData {
  businessName?: string;
  businessDescription?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmailAddress?: string;
  businessCategory?: string;
  businessOpenHours?: string;
  businessOpenDays?: string;
  businessWebsite?: string;
  extra_information?: string;
  faqs?: FAQ[];
  items?: Item[];
}

export async function POST(request: NextRequest) {
  try {
    const { content, type, fileName } = await request.json();

    if (!content || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare the prompt for Groq API
    const systemPrompt = `You are an AI assistant that extracts business information from various sources. 
Extract the following information if available and return it in a structured JSON format:
- businessName
- businessDescription
- businessAddress
- businessPhone
- businessEmailAddress
- businessCategory
- businessOpenHours
- businessOpenDays
- businessWebsite
- extra_information
- faqs (array of {question, answer})
- items (array of {name, price, description})

Return ONLY valid JSON, no additional text or explanation.`;

    let userPrompt = "";

    if (type === "url") {
      userPrompt = `Extract business information from this website URL: ${content}`;
    } else if (type === "text") {
      userPrompt = `Extract business information from this description:\n\n${content}`;
    } else if (type === "file") {
      // For files, check if it contains base64 data (images/PDFs)
      if (
        content.includes("data:image/") ||
        content.includes("data:application/pdf")
      ) {
        // Extract file type
        // const fileType = fileName?.split(".").pop()?.toLowerCase() || "unknown";

        // For images and PDFs, we can't process them directly with text models
        // Instead, we'll use a fallback approach
        if (content.includes("data:image/")) {
          return NextResponse.json(
            {
              error:
                "Image files require OCR processing. Please use text files or describe your business manually.",
              extractedData: {},
            },
            { status: 400 }
          );
        } else if (content.includes("data:application/pdf")) {
          return NextResponse.json(
            {
              error:
                "PDF files require text extraction. Please convert to text or describe your business manually.",
              extractedData: {},
            },
            { status: 400 }
          );
        }
      }

      // For text files
      userPrompt = `Extract business information from this file content (${fileName}):\n\n${content}`;
    }

    // Call Groq API
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.3,
          max_tokens: 2048,
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json().catch(() => ({}));
      console.error("Groq API Error:", {
        status: groqResponse.status,
        statusText: groqResponse.statusText,
        error: errorData,
      });
      throw new Error(
        `Failed to get response from Groq API: ${groqResponse.status} - ${
          errorData.error?.message || groqResponse.statusText
        }`
      );
    }

    const groqData = await groqResponse.json();
    const extractedText = groqData.choices[0]?.message?.content || "{}";

    // Parse the JSON response
    let extractedData: ExtractedData = {};
    try {
      // Clean the response (remove markdown code blocks if present)
      const cleanedText = extractedText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      extractedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Error parsing Groq response:", parseError);
      console.error("Raw response:", extractedText);
      // Try to extract JSON from the response
      const jsonMatch = extractedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          extractedData = JSON.parse(jsonMatch[0]);
        } catch {
          // If still fails, return error
          throw new Error(
            "Failed to parse AI response. Please try again with clearer information."
          );
        }
      } else {
        throw new Error(
          "AI did not return valid data. Please try again with more detailed information."
        );
      }
    }

    return NextResponse.json({ extractedData });
  } catch (error) {
    console.error("Error in extract-business-data API:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to extract business data",
        extractedData: {},
      },
      { status: 500 }
    );
  }
}
