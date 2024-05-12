import CommunityIllustration from '@/public/about/images/community-illustration.png'
import FlyingArrow from '@/public/about/images/flying-arrow.png'
import Underline from '@/public/underline.png'
import CurveLine from '@/public/about/images/curve-line.png'
import Image from 'next/image'

const AboutHero = () => {
	return (
		<div className='mt-[80px] container lg:mt-[120px] p-5'>
			<div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
				<div className='flex justify-center'>
					<div>
						<h1 className='max-w-[480px] text-6xl text-[#1E1E1E] font-bold relative lg:max-w-[684px] lg:text-[68px]'>
							NeighborhoodPins is a community, <br /> first and{' '}
							<span className='relative'>
								foremost.{' '}
								<Image
									src={Underline}
									alt=''
									className='absolute left-0 bottom-0'
								/>
							</span>
							<Image
								src={FlyingArrow}
								alt=''
								className='absolute top-[-45px] right-[-45px]'
							/>
						</h1>
						<p className='mt-[15px] max-w-[595px] text-2xl text-[#474747] lg:text-[22px] lg:mt-[35px]'>
							We're a technology platform that is focused on
							building a community of members that each play a
							part in improving our daily lives across Long
							Island.
						</p>
					</div>
				</div>
				<div className='flex justify-center'>
					<Image
						src={CommunityIllustration}
						alt=''
						className='w-[50%] lg:w-full'
					/>
				</div>
			</div>

			<Image
				src={CurveLine}
				alt=''
				className='mx-auto mt-[-40px] mb-[-40px] w-[50%] lg:w-[50%]'
			/>
		</div>
	)
}

export default AboutHero
