import AboutHero from "@/app/components/about/AboutHero";
import CallToAction from "@/app/components/about/CallToAction";
import OurVision from "@/app/components/about/OurVision";
import Team from "@/app/components/about/Team";

export default function About() {
	return (
		<div className='overflow-hidden flex flex-col items-center'>
			<AboutHero />
			<OurVision />
			<Team />
			<CallToAction />
		</div>
	)
}
