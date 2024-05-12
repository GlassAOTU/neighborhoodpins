import Image from 'next/image'

import CallToActionIllustration from '@/public/about/images/call-to-action-illustration.png'
import CallToActionSquare1 from '@/public/about/images/call-to-action-squares-1.png'
import CallToActionSquare2 from '@/public/about/images/call-to-action-squares-2.png'
import Ellipse1 from '@/public/about/images/ellipses-1.png'
import Vector1 from '@/public/about/images/vector-1.png'
import Vector2 from '@/public/about/images/vector-2.png'
import Link from 'next/link'

const CallToAction = () => {
	return (
		<div className='my-[60px] container text-white lg:my-[100px] p-5'>
			<div
				className='relative grid bg-gradient-to-l from-[#AADD66] via-[#135C49] to-[#125B49] rounded-[20px] p-[20px] lg:p-[20px] lg:pl-[60px]'
				style={{ gridTemplateColumns: '1.5fr 1fr' }}
			>
				<div className='relative flex flex-col justify-center'>
					<h2
						className='text-[28px] lg:text-[48px]'
						style={{ fontFamily: `Righteous, sans-serif` }}
					>
						Become a member now
					</h2>
					<p
						className='mt-1 text-[13px] lg:mt-3 lg:text
          -[16px]'
					>
						Register yourself to join the community
					</p>
					<Link href='/signup'>
						<button className='mt-3 px-[20px] py-[8px] rounded-full bg-[#AADD66] text-black font-bold hover:bg-[#bffd6f] lg:mt-10 lg:px-[42px] lg:py-[15px]'>
							Sign up
						</button>
					</Link>
					<Image
						src={CallToActionSquare1}
						alt=''
						className='hidden absolute bottom-0 right-0 lg:block'
					/>
					<Image
						src={Ellipse1}
						alt=''
						className='absolute top-0 right-[20%] w-[400px] opacity-70 pointer-events-none'
					/>
				</div>
				<div className='relative'>
					<Image src={CallToActionIllustration} alt='' />
					<Image
						src={CallToActionSquare2}
						alt=''
						className='absolute top-0 right-0'
					/>
				</div>

				<Image
					src={Vector1}
					alt=''
					className='absolute left-[-15px] bottom-[8px] -z-10 lg:left-[-57px] lg:bottom-[16px]'
				/>
				<Image
					src={Vector2}
					alt=''
					className='absolute -bottom-2 -right-2 w-[50%] lg:-bottom-6 lg:-right-6 lg:w-[480px]'
				/>
			</div>
		</div>
	)
}

export default CallToAction
