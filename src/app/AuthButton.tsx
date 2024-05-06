import { SettingsOptions } from "@/components/SettingsOptions";
import { getCurrentUser } from "@/lib/auth";

import { sleep } from "@/lib/utils";

export default async function AuthButton() {
  const user = await getCurrentUser();
  // await sleep(3000);
  return (
    <div className="relative items-center gap-4 flex flex-0 justify-between lg:justify-end">
      <SettingsOptions
        initialUser={user?.toJSON()}

        // enableLogoAnimation={storedEnableLogoAnimation}
        // onEnableLogoAnimationChange={setStoredEnableLogoAnimation}
        // onPlayAnimation={() => ""}
        // forcePlayAnimation={forcePlayAnimation}
        // setForcePlayAnimation={setForcePlayAnimation}
      ></SettingsOptions>
    </div>
  );
}
