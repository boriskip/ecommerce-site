import LeftMenu from './HeroLeftMenu';
import PromoBanner from './PromoBanner';

export default function HeroSection() {
    return (
<section className='bg-white py-6'>
    <div className="max-w-screen-xl mx-auto flex gap-6 px-4">
        <LeftMenu />
        <PromoBanner />
    </div>
</section>
    );
}