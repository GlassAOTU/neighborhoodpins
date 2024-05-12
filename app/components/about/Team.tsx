import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";

import Underline from "@/public/underline.png";
import TeamAvatar1 from "@/public/about/images/team-avatar-1.png";
import TeamAvatar2 from "@/public/about/images/team-avatar-2.png";

const teamData = [
  {
    name: "Abaseen Khan",
    designation: "Founder",
    linkedin: "https://www.linkedin.com/in/abaseen-khan/",
    profilePicture: TeamAvatar1,
  },
  {
    name: "Alex Martinez",
    designation: "Co-Founder",
    linkedin: "https://www.linkedin.com/in/alex-martinez-357990250/",
    profilePicture: TeamAvatar2,
  },
];

const Team = () => {
  return (
    <div className="mt-[40px] py-[10px] bg-white  lg:mt-[70px] lg:py-[100px]">
      <div className="container">
        <div className="text-center">
          <h2 className="relative inline-block text-[32px] text-[#1E1E1E] font-bold lg:text-[70px]">
            Say hello to our team members
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-2 lg:gap-10">
          {teamData.map((member, index) => (
            <div key={index} className="flex flex-col items-center sm:flex-row">
              <div className="flex-1">
                <Image src={member.profilePicture} alt="" className="max-w-[220px] border-2" />
              </div>

              <div
                className="mt-auto w-full bg-white sm:w-[220px]"
                style={{ boxShadow: "9px -9px 16px -5px rgba(102, 115, 121, 0.08)" }}
              >
                <div className="p-3 pb-5 sm:p-6 text-center">
                  <h4 className="text-[#1E1E1E] text-[20px] font-semibold sm:text-[24px]">
                    {member.name}
                  </h4>
                  <p className="mt-3 text-[#6A778B] text-[15px] sm:text-[20px]">
                    {member.designation}
                  </p>
                </div>
                <div
                  className="py-[8px] px-3 lg:py-[14px] lg:px-5 flex justify-center items-center"
                  style={{ boxShadow: "9px -9px 16px -5px rgba(102, 115, 121, 0.08)" }}
                >
                  <a href={member.linkedin} target="_blank">
                    <button
                      className="p-3 flex items-center gap-2 rounded-md text-[#0E76A8] font-semibold hover:!bg-[#d1eefb]"
                      style={{ backgroundColor: "rgba(14, 118, 168, 0.08)" }}
                    >
                      <FaLinkedinIn className="text-[18px]" />
                      <p>LinkedIn Profile</p>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
