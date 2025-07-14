import { useEffect, useState } from 'react';

function getTimeLeft(target) {
  const now = new Date();
  const end = new Date(target);
  const diff = end - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function FlashTimer({ startsAt, endsAt }) {
  if (!startsAt || !endsAt || isNaN(new Date(startsAt)) || isNaN(new Date(endsAt))) {
    return <div className="text-gray-400 text-xs">Нет таймера</div>;
  }
  const [now, setNow] = useState(Date.now());
  const [mode, setMode] = useState('before'); // before, active, ended

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const start = new Date(startsAt);
    const end = new Date(endsAt);
    const current = new Date(now);

    if (current < start) {
      setMode('before');
    } else if (current >= start && current <= end) {
      setMode('active');
    } else {
      setMode('ended');
    }
  }, [now, startsAt, endsAt]);

  const start = new Date(startsAt);
  const end = new Date(endsAt);
  const current = new Date(now);

  let time, label;
  if (mode === 'before') {
    time = getTimeLeft(start);
    label = 'До старта';
  } else if (mode === 'active') {
    time = getTimeLeft(end);
    label = 'До конца';
  } else {
    time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    label = 'Акция завершена';
  }

  return (
    <div className="flex items-center space-x-4 text-sm font-mono">
      <div>
        <p className="text-gray-500 text-xs">{label === 'До старта' ? 'Start In' : label === 'До конца' ? 'Ends In' : 'Ended'}</p>
        {label === 'Акция завершена' ? (
          <p className="text-xl font-bold text-red-500">00:00:00</p>
        ) : (
          <p className="text-xl font-bold">
            {String(time.days).padStart(2, '0')}d : {String(time.hours).padStart(2, '0')}h : {String(time.minutes).padStart(2, '0')}m : {String(time.seconds).padStart(2, '0')}s
          </p>
        )}
      </div>
    </div>
  );
}