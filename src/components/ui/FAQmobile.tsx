import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "faq-1",
    title: "What is SnapUs?",
    content: (
      <>
        SnapUs is a platform that lets guests snap, upload, and share event
        photos in real-time using a browser or the mobile app.
      </>
    ),
  },
  {
    id: "faq-2",
    title: "How does it work?",
    content: (
      <>
        Guests scan a QR code or enter an event store, use their phones camera
        directly from the browser, and upload pictures to a shared gallery
        instantly.
      </>
    ),
  },
  {
    id: "faq-3",
    title: "Do guests need to install an app?",
    content: (
      <>
        Nope. SnapUs is also browser-based and works instantly on any
        smartphone, although the mobile app provide a better user experience.
      </>
    ),
  },
  {
    id: "faq-4",
    title: "Can the event host moderate photos?",
    content: (
      <>
        Yes, hosts can review, approve, or remove photos from a moderation
        dashboard before they are shown to others.
      </>
    ),
  },
  {
    id: "faq-5",
    title: "Can guests view and download photos later?",
    content: (
      <>
        Yes. Guests can revisit the event link anytime to view and download the
        gallery, unless the host has restricted it.
      </>
    ),
  },
  {
    id: "faq-6",
    title: "Is the photo gallery live or private?",
    content: (
      <>
        You decide. Galleries can be live (instant uploads), moderated, or
        private (only visible to the host).
      </>
    ),
  },
  {
    id: "faq-7",
    title: "How long are photos stored?",
    content: (
      <>
        Photos are stored securely and remain accessible after the event unless
        deleted by the host.
      </>
    ),
  },
  {
    id: "faq-8",
    title: "Is it secure and private?",
    content: (
      <>
        Absolutely. All uploads are encrypted in transit. Only people with the
        event code or QR code can access the gallery.
      </>
    ),
  },
  {
    id: "faq-9",
    title: "Can I customize my event page?",
    content: (
      <>
        Yes. You can add titles, event descriptions and cover images to match
        your brand or vibe.
      </>
    ),
  },
  {
    id: "faq-10",
    title: "Does it support large or branded events?",
    content: (
      <>
        Yes. SnapUs scales easily and supports weddings, conferences,
        activations, and even corporate branding.
      </>
    ),
  },
  {
    id: "faq-11",
    title: "What devices are supported?",
    content: (
      <>
        Any modern smartphone or tablet with a camera and internet connection.
        Both iPhone and Android work great.
      </>
    ),
  },
  {
    id: "faq-12",
    title: "Can I download all photos at once?",
    content: (
      <>
        Yes. As a host, you can download the entire photo set in one click as a
        ZIP file.
      </>
    ),
  },
  {
    id: "faq-13",
    title: "How long can the video upload be?",
    content: <>Videos can be up to 3 minutes long.</>,
  },
  {
    id: "faq-14",
    title: "Can SnapUs be used at private family events?",
    content: (
      <>
        Absolutely. It is perfect for intimate gatherings like birthdays, naming
        ceremonies, and weddings.
      </>
    ),
  },
];

export function AccordionDemo() {
  return (
    <div className="relative w-full block lg:hidden mt-6 px-7">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="faq-1"
      >
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent className="text-pretty">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
