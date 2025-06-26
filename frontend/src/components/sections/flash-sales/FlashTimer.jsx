export default function FlashTimer() {
  return (
    <div className="flex items-center space-x-4 text-sm font-mono">
      <div>
        <p className="text-gray-500 text-xs">Days</p>
        <p className="text-xl font-bold">03</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs">Hours</p>
        <p className="text-xl font-bold">23</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs">Minutes</p>
        <p className="text-xl font-bold">19</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs">Seconds</p>
        <p className="text-xl font-bold">56</p>
      </div>
    </div>
  );
}
