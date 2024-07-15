import { CommandMenu } from "@/components/CommandMenu";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { ChevronRightIcon, EqualIcon, TelescopeIcon } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Breadcrumb from "./(foobargroup)/foobar/explore/[hub]/[pt]/[t3]/[distance]/[pg]/Breadcrumb";
import React, { PropsWithChildren } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  console.log("rendering home page");
  return (
    <>
      <div className="bg-gray-300/80 bg-[url('/support-waves.svg')] ">
        <div className="container mx-auto max-w-[1080px] pb-4 pt-6 h-full">
          <div className="grid grid-cols-12 rounded-lg overflow-hidden">
            <div className="col-span-12 md:col-span-12 rounded-lg overflow-hidden bg-gray-100 h-[320px] px-6 py-4 flex gap-12 items-start w-full">
              <div>
                <div className="flex items-center">
                  <Link href="/">
                    <img
                      className="w-6 h-6 relative mr-2"
                      src={config.logoPath}
                      width="24"
                      height="24"
                    />
                  </Link>
                  <div className="flex items-center gap-2 opacity-75">
                    <span className="opacity-20 pl-1.5">/</span>
                    <span className="opacity-70">20 Mushrooms</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed pt-6">
                  Welcome to 20 Mushrooms, your new go-to destination for
                  discovering the best dishes and restaurants around you!
                  Powered by advanced AI & a community of food enthusiasts, our
                  recommendation engine curates personalized dining experiences
                  tailored to your taste.
                </p>
                <p className="text-muted-foreground text-base leading-relaxed pt-4">
                  Whether you&#39;re looking for a hidden gem or sharing your
                  favorite finds, 20 Mushrooms makes it easy to explore and
                  recommend top dishes to fellow food enthusiasts. Join our
                  community today and elevate your culinary adventures!
                </p>
              </div>

              <div className="flex flex-col gap-2 min-w-[340px]">
                <Callout title="How It Works">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <img
                      className="h-12 w-12 min-w-12 opacity-90 stroke-1 bg-gray-200 rounded-full p-3.5 border-2 border-gray-300"
                      src={config.logoPath}
                      width="24"
                      height="24"
                    />
                    <div>
                      Leave a mushroom on dishes you recommend. Choose wisely -
                      you only get 20 mushrooms.
                    </div>
                  </div>
                </Callout>
                <Separator className="opacity-100 bg-gray-300" />
                <Callout title="Go Exploring">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <TelescopeIcon className="h-12 w-12 min-w-12  opacity-90 stroke-1 bg-gray-200 rounded-full p-3 border-2 border-gray-300" />
                    <div>
                      Explore an area. Search by location, type of dish,
                      restaurant and more.
                    </div>
                  </div>
                </Callout>
                <Separator className="opacity-100 bg-gray-300" />
                <Callout title="Meet Carmen" moreLink="AI Assistant">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <Avatar className="hidden h-12 w-12 sm:flex border-2 border-gray-400">
                      <AvatarImage src="/carmen.png" alt="Meet Carmen" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div>
                      Carmen is an AI Assistant that helps connect you to
                      restaurants & dishes in your area.
                    </div>
                  </div>
                </Callout>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <Breadcrumb>
        <div className="h-[36px] flex items-center text-sm"></div>
      </Breadcrumb>
      <div className="container mx-auto max-w-[1080px] py-6">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-12">
            <div className="bg-gray-50 relative z-10 p-8">
              <h2 className="pb-4">How It Works</h2>
              <div className="flex items-center gap-8">
                <div className="min-w-[200px] w-[200px]">
                  <script
                    src="https://fast.wistia.com/embed/medias/2h3f4pt7xf.jsonp"
                    async
                  ></script>
                  <script
                    src="https://fast.wistia.com/assets/external/E-v1.js"
                    async
                  ></script>
                  <div
                    className="wistia_responsive_padding"
                    style={{
                      padding: "100.0% 0 0 0",
                      position: "relative",
                    }}

                    // style="padding:100.0% 0 0 0;position:relative;"
                  >
                    <div
                      className="wistia_responsive_wrapper"
                      style={{
                        height: "100%",
                        left: 0,
                        top: 0,
                        width: "100%",
                        position: "absolute",
                      }}
                      // style="height:100%;left:0;position:absolute;top:0;width:100%;"
                    >
                      <div
                        className="wistia_embed wistia_async_2h3f4pt7xf seo=false videoFoam=true"
                        style={{
                          height: "100%",
                          width: "100%",
                          position: "relative",
                        }}
                        // style="height:100%;position:relative;width:100%"
                      >
                        <div
                          className="wistia_swatch"
                          style={{
                            height: "100%",
                            left: 0,
                            top: 0,
                            opacity: 0.5,
                            width: "100%",
                            position: "absolute",
                            overflow: "hidden",
                          }}
                          // style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"
                        >
                          <img
                            src="https://fast.wistia.com/embed/medias/2h3f4pt7xf/swatch"
                            style={{
                              filter: "blur(5px)",
                              height: "100%",
                              objectFit: "contain",
                              width: "100%",
                            }}
                            // style="filter:blur(5px);height:100%;object-fit:contain;width:100%;"
                            alt=""
                            aria-hidden="true"
                            // onLoad="this.parentNode.style.opacity=1;"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-4">
                    &quot;Carmen: Intro&quot; (9s)
                  </p>
                </div>
                <div className="min-w-[200px] w-[200px]">
                  <script
                    src="https://fast.wistia.com/embed/medias/3ampi72fyy.jsonp"
                    async
                  ></script>
                  <div
                    className="wistia_responsive_padding"
                    style={{
                      padding: "100.0% 0 0 0",
                      position: "relative",
                    }}

                    // style="padding:100.0% 0 0 0;position:relative;"
                  >
                    <div
                      className="wistia_responsive_wrapper"
                      style={{
                        height: "100%",
                        left: 0,
                        top: 0,
                        width: "100%",
                        position: "absolute",
                      }}
                      // style="height:100%;left:0;position:absolute;top:0;width:100%;"
                    >
                      <div
                        className="wistia_embed wistia_async_3ampi72fyy seo=false videoFoam=true"
                        style={{
                          height: "100%",
                          width: "100%",
                          position: "relative",
                        }}
                        // style="height:100%;position:relative;width:100%"
                      >
                        <div
                          className="wistia_swatch"
                          style={{
                            height: "100%",
                            left: 0,
                            top: 0,
                            opacity: 0.5,
                            width: "100%",
                            position: "absolute",
                            overflow: "hidden",
                          }}
                          // style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"
                        >
                          <img
                            src="https://fast.wistia.com/embed/medias/3ampi72fyy/swatch"
                            style={{
                              filter: "blur(5px)",
                              height: "100%",
                              objectFit: "contain",
                              width: "100%",
                            }}
                            // style="filter:blur(5px);height:100%;object-fit:contain;width:100%;"
                            alt=""
                            aria-hidden="true"
                            // onLoad="this.parentNode.style.opacity=1;"
                          />
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <p className="text-xs text-muted-foreground pt-4">
                    &quot;Carmen: 20 Mushrooms&quot; (10s)
                  </p>
                </div>
                <div className="min-w-[200px] w-[200px]">
                  <script
                    src="https://fast.wistia.com/embed/medias/6kkrpuhz59.jsonp"
                    async
                  ></script>
                  <div
                    className="wistia_responsive_padding"
                    style={{
                      padding: "100.0% 0 0 0",
                      position: "relative",
                    }}

                    // style="padding:100.0% 0 0 0;position:relative;"
                  >
                    <div
                      className="wistia_responsive_wrapper"
                      style={{
                        height: "100%",
                        left: 0,
                        top: 0,
                        width: "100%",
                        position: "absolute",
                      }}
                      // style="height:100%;left:0;position:absolute;top:0;width:100%;"
                    >
                      <div
                        className="wistia_embed wistia_async_6kkrpuhz59 seo=false videoFoam=true"
                        style={{
                          height: "100%",
                          width: "100%",
                          position: "relative",
                        }}
                        // style="height:100%;position:relative;width:100%"
                      >
                        <div
                          className="wistia_swatch"
                          style={{
                            height: "100%",
                            left: 0,
                            top: 0,
                            opacity: 0.5,
                            width: "100%",
                            position: "absolute",
                            overflow: "hidden",
                          }}
                          // style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"
                        >
                          <img
                            src="https://fast.wistia.com/embed/medias/6kkrpuhz59/swatch"
                            style={{
                              filter: "blur(5px)",
                              height: "100%",
                              objectFit: "contain",
                              width: "100%",
                            }}
                            // style="filter:blur(5px);height:100%;object-fit:contain;width:100%;"
                            alt=""
                            aria-hidden="true"
                            // onLoad="this.parentNode.style.opacity=1;"
                          />
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <p className="text-xs text-muted-foreground pt-4">
                    &quot;Carmen: Boston&quot; (10s)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#cbd5e4]/30">
        <div className="grid grid-cols-12 container mx-auto max-w-[1080px] py-4">
          <div className="col-span-12 md:col-span-12">
            <div className=" relative z-10 p-8">
              <h2>Meet Carmen</h2>
              <Link href="/foobar/explore/boston/restaurant/burger/4">
                Boston
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Callout({
  title,
  moreLink = "",
  children,
}: PropsWithChildren<{ title?: React.ReactNode; moreLink?: React.ReactNode }>) {
  return (
    <Card className="max-w-sm h-1/2 border-0 bg-transparent shadow-none pt-1">
      <CardHeader className="px-0 py-0">
        {/* <CardTitle className="text-base">{title}</CardTitle> */}
        <CardDescription className="flex items-center gap-2 text-xs text-primary">
          {children}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-1 py-0 text-right">
        <Button
          size="sm"
          variant="outline"
          className="text-xs text-gray-600 h-8"
        >
          {moreLink || title} <ChevronRightIcon className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  );
}
