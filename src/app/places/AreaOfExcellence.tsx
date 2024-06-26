import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";

export function AreaOfExcellence({
  photoUrl,
  tags,
  location,
  reason = "",
  profileName,
  onSubmit,
}: any) {
  const refTags = useRef(null);
  const refRating = useRef(null);
  const refLocation = useRef(null);
  const refReason = useRef(null);
  const [currentReason, setCurrentReason] = useState("");
  const [currentReasons, setCurrentReasons] = useState([]);

  async function handleGenerateReason() {
    console.log("handleGenerateReason", profileName, refTags.current);
    const results = await fetch(
      `/api/suggest?name=${profileName}&tag=${refTags?.current?.value || ""}`
    ).then((resp) => resp.json());

    console.log("results", results);
    if (results.success) {
      setCurrentReasons(results.data);
    }
  }

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    const fd = {
      tags: refTags.current && (refTags.current as HTMLInputElement).value,
      rating:
        refRating.current && (refRating.current as HTMLInputElement).value,
      location:
        refLocation.current && (refLocation.current as HTMLInputElement).value,
      reason:
        refReason.current && (refReason.current as HTMLInputElement).value,
    };
    await onSubmit(fd);
    console.log("form", fd, document.getElementById("myform"));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Create</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[800px]">
        <form id="myform" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Attributes</h4>
              <p className="text-sm text-muted-foreground">
                Add a new area of excellence.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="reason">
                  <Button onClick={handleGenerateReason}>reason</Button>
                </Label>
                <Input
                  ref={refReason}
                  id="reason"
                  defaultValue={currentReason}
                  className="col-span-2 h-8"
                />
                {currentReasons.map((reason, i) => (
                  <Button
                    key={reason || i}
                    size="sm"
                    className="block"
                    onClick={() => setCurrentReason(reason)}
                  >
                    {reason}
                  </Button>
                ))}
              </div>
              {/* <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="photUrl">photoUrl</Label>
                <Input
                  id="photUrl"
                  defaultValue={photoUrl}
                  className="col-span-2 h-8"
                />
              </div> */}
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="tags">tags</Label>
                <Input
                  id="tags"
                  ref={refTags}
                  defaultValue={""}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="rating">rating</Label>
                <Input
                  ref={refRating}
                  id="rating"
                  defaultValue="1"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="location">location</Label>
                <Input
                  ref={refLocation}
                  id="location"
                  defaultValue={Object.values(location)}
                  className="col-span-2 h-8"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  size="sm"
                  // onClick={() => onSubmit({ foo: "bar" })}
                >
                  submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
