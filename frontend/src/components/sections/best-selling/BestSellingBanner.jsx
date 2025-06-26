import TimeBox from './TimeBox';

export default function BestSellingBanner() {
    return (
<section className="bg-black text-white py-12 px-4">
<div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center gap-10">
    <div>
    <p className="text-green-500 font-medium mb-2">Categories</p>
     <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Enhance Your <br /> Music Experience</h2>

     <div className="flex items-center gap-2 mb-5">
        <TimeBox value="23" label="Hours" />
        <TimeBox value="05" label="Days" />
        <TimeBox value="59" label="Minutes" />
        <TimeBox value="35" label="Seconds" />
      </div>

        <button className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-sm">
         Buy Now!
        </button>
        </div>

            <div className="w-full">
        <img 
     src="/best-seling/best-seling-banner.png"
     alt=""
     className="w-full object-contain"
     />
    </div>
    </div>
</section>
    );
}