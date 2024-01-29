export default async function Foobar({ params }: { params: {} }) {
  const data = await fetch(
    "https://hacker-news.firebaseio.com/v0/item/1.json"
  ).then((resp) => resp.json());
  return <div>foobar: {JSON.stringify(data)}</div>;
}
