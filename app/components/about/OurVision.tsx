import Image from "next/image";

import OurVisionIllustration from "@/public/about/images/our-vision-illustration.png";
import Underline from "@/public/underline.png";

const OurVision = () => {
  return (
    <div className="container grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="flex justify-center">
        <Image src={OurVisionIllustration} alt="" className="max-w-[567px] w-[50%] lg:w-full" />
      </div>
      <div className="flex justify-center">
        <div className="text-center lg:text-left">
          <h2 className="relative inline-block text-[50px] text-[#1E1E1E] font-bold lg:text-[70px]">
            Our Vision <Image src={Underline} alt="" className="absolute left-0 bottom-0" />
          </h2>
          <p className="mt-[25px] max-w-[531px] text-2xl text-[#474747] lg:text-[22px]">
            Since the early days, our team has focused on how we can strengthen and connect our
            communities to positively impact the lives of people.
          </p>
          <p className="mt-[25px] max-w-[531px] text-2xl text-[#474747] lg:text-[22px]">
              That’s why we’ve created our own community here at NeighborhoodPins that allows
              community members to engage and support others around them. We hope to continue
              expanding in the near future to be able to provide these resources to other cities
              in the United States.
            </p>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
