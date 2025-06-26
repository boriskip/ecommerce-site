export default function TimeBox({ value, label }) {
  return (
    <div className="bg-white text-black px-4 py-3 rounded-full text-center w-[70px]">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs font-medium">{label}</div>
    </div>
  );
}