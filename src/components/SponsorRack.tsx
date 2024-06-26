import { config } from "@/lib/config";
import SponsorCard from "./SponsorCard";
import { BadgeCheckIcon } from "lucide-react";

export default function SponsorRack({ hub }: { hub: string }) {
  return (
    <div className="bg-muted relative w-full flex_ max-w-7xl mx-auto items-center justify-between px-2 py-2">
      <div className="flex items-center justify-between gap-1">
        {/* <TabNav profile={undefined} /> */}
        <SponsorCard name="Constant Contact, Inc" pic="/constant-contact.png" />
        <SponsorCard name="Boston Dynamics" pic="/boston-dynamics.svg" />
        <SponsorCard name="Toast, Inc" pic="/toast.png" />
        <SponsorCard name="Akamai Technologies" pic="/akamai.jpg" />
      </div>
      <div className="flex items-center justify-between gap-1">
        {/* <TabNav profile={undefined} /> */}
        <SponsorCard name="Apple, Inc" pic="/apple.jpg" />
        <SponsorCard name="Google, Inc" pic="/google.png" />
        <SponsorCard name="Nvidia, Inc" pic="/nvidia.png" />
        <SponsorCard
          name="Boston Childrens Hospital"
          pic="/boston-childrens.jpg"
        />
      </div>
      <div className="flex items-center justify-between gap-1">
        {/* <TabNav profile={undefined} /> */}
        <SponsorCard
          name="The Sullivan Family of Lexington, MA"
          pic={config.logoPath}
          className="[&>img]:p-1"
        />
        <SponsorCard
          name="Greater Boston Foodbank"
          pic="/greater-boston-foodbank.jpg"
        />
        <SponsorCard name="The Jimmy Fund" pic="/jimmy-fund.jpg" />
        <SponsorCard
          name="Tavern In The Square"
          pic="/tavern-in-the-square.png"
        />
      </div>
      <div className="flex items-center justify-between gap-1">
        {/* <TabNav profile={undefined} /> */}
        <SponsorCard
          name="The Rodriguiz Family of East Boston, MA"
          pic={config.logoPath}
          className="[&>img]:p-1"
        />
        <SponsorCard
          name="The Brown Family of Cambridge, MA"
          pic={config.logoPath}
          className="[&>img]:p-1"
        />
        <SponsorCard
          name="The Oppemheim Family of Concord, MA"
          pic={config.logoPath}
          className="[&>img]:p-1"
        />
        <SponsorCard
          name="The Korkova Family of Burlington, MA"
          pic={config.logoPath}
          className="[&>img]:p-1"
        />
      </div>
      <div className="w-full absolute -top-6 left-0 text-sm text-muted-foreground px-2 flex items-center justify-between">
        <div>
          Thank you to all the sponsors who make{" "}
          <strong>
            Blue Mushroom <span className="capitalize">{hub}</span>
          </strong>{" "}
          possible.
        </div>
        <div className="text-md flex place-items-center gap-2 font-semibold absolute -top-2 right-4">
          Sponsors <BadgeCheckIcon className="h-5 w-5  text-blue-500" />
        </div>
      </div>
    </div>
  );
}
