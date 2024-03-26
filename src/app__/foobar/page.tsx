import { Button } from "@/components/ui/button";

export default async function Foobar({ params }: { params: {} }) {
  const data = await fetch(
    "https://hacker-news.firebaseio.com/v0/item/1.json"
  ).then((resp) => resp.json());
  return (
    <div>
      <Button>foobar</Button>: {JSON.stringify(data)}
    </div>
  );
}
