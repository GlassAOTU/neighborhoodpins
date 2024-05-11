import HistoryTable from "@/app/components/HistoryTable";
import IssueTable from "@/app/components/IssueTable";
import Image from "next/image";
import Underline from "@/public/underline.png";

export default async function Tracker({ government }: any) {
  return (
    <main className='flex flex-col items-center'>
            <div className='text-center'>
                <h2 className='relative inline-block text-[40px] text-[#1E1E1E] font-bold lg:text-[70px] mt-10'>
                    Issue Tracker{' '}
                    <Image
                        src={Underline}
                        alt=''
                        className='absolute left-0 bottom-0'
                    />
                </h2>
                <HistoryTable />
            </div>
        </main>
  );
}
