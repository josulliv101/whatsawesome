import { CommandMenu } from "@/components/CommandMenu";

export default function Page() {
  return (
    <div className="bg-blue-100/50  flex justify-center items-center h-full">
      <p className="w-1/2 my-36 max-w-1/2">
        <CommandMenu placeHolderText="Search for excellence by name, location, category & more" />
      </p>
    </div>
  );
}
