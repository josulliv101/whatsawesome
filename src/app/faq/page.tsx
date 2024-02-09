import PageHeading from "@/components/PageHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    question: "What is the purpose of the site?",
    response: "...",
  },
  {
    question: "Why is the logo a mushroom?",
    response: "...",
  },
  {
    question: "Why is inclusion of a profile invitation only?",
    response: "...",
  },
  {
    question:
      "Why are there people who have done non-awesome things included in the whats awesome catalog?",
    response: "...",
  },
  {
    question: "How can I add a profile to the catalog?",
    response: "...",
  },
  {
    question: "What does the awesome rating mean?",
    response: "...",
  },
  {
    question:
      "What is the difference between a &quot;hub&quot; and a &quot;profile&quot;?",
    response: "...",
  },
];

export default async function FAQ({ params }: { params: {} }) {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-4 py-6 lg:px-8 lg:py-12">
      <PageHeading
        heading="FAQ"
        subhead="Find answers to commonly asked questions."
      />
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.response}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
