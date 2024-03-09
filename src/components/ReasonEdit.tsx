import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Reason } from "@/lib/profile";
import GoogleMap, {
  API_KEY,
  ClientAPIProvider,
} from "@/app/edit/profile/[id]/GoogleMap";
import MultipleSelector from "./MultipleSelector";
import { useState } from "react";
import { toast } from "sonner";
import { updateReason } from "@/lib/firebase";
import { handleUpdateReason } from "@/lib/actions";

export function ReasonEdit({
  id,
  description = "",
  rating = 0,
  latlng,
  photoUrl = "",
  tags = [],
  profileId,
}: {
  id: string;
  description: string;
  rating: number;
  photoUrl?: string;
  tags: string[];
  latlng?: {
    lat: number;
    lng: number;
  };
  profileId: string;
}) {
  const [open, setOpen] = useState(false);
  const [formState, setState] = useState({
    id,
    description,
    rating,
    latlng,
    photoUrl,
    tags,
  });

  const handleChange = (field: string, value: unknown) => {
    setState({
      ...formState,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    console.log("handleSubmit", profileId, id, formState);
    const foobar = await handleUpdateReason(profileId, id, formState);
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(formState, null, 2)}</code>
      </pre>
    );
  };
  return (
    <ClientAPIProvider apiKey={API_KEY}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"}>Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] sm:max-h-[500px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Reason</DialogTitle>
            <DialogDescription>
              Make changes and click save when you&#39;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Id
              </Label>
              <Input
                id="id"
                value={formState.id}
                disabled
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Textarea
                id="name"
                value={formState.description}
                className="col-span-3"
                onChange={(ev) => handleChange("description", ev.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Rating
              </Label>
              <Input
                id="rating"
                value={formState.rating}
                className="col-span-3"
                type="number"
                onChange={(ev) =>
                  handleChange("rating", Number(ev.target.value))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                LatLng
              </Label>
              {open && (
                <GoogleMap
                  key={id}
                  onChange={(field: string, latlng: any) => {
                    console.log(field, latlng);
                    setState({
                      ...formState,
                      latlng,
                    });
                    //replace(tags.map((item) => item.value));
                  }}
                  latlng={formState.latlng}
                  className="col-span-3"
                />
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Photo Url
              </Label>
              <Input
                id="photoUrl"
                defaultValue={formState.photoUrl}
                className="col-span-3"
                onChange={(ev) => handleChange("photoUrl", ev.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Tags
              </Label>
              <div className="col-span-3">
                <MultipleSelector
                  onChange={(tags) => {
                    console.log(tags);
                    setState({
                      ...formState,
                      tags: tags.map((tag) => tag.value),
                    });
                    //replace(tags.map((item) => item.value));
                  }}
                  defaultOptions={[]}
                  value={(formState.tags as unknown as string[]).map((tag) => ({
                    label: tag,
                    value: tag,
                  }))}
                  placeholder="Add tags..."
                  creatable
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientAPIProvider>
  );
}
