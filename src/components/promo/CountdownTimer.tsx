import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate, className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24) + Math.floor(difference / (1000 * 60 * 60 * 24)) * 24,
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex flex-col items-center">
        <span className="bg-foreground text-background font-bold text-lg px-2 py-1 rounded-md min-w-[2.5rem] text-center">
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="text-xs text-muted-foreground mt-1">hrs</span>
      </div>
      <span className="text-foreground font-bold text-lg">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-foreground text-background font-bold text-lg px-2 py-1 rounded-md min-w-[2.5rem] text-center">
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-xs text-muted-foreground mt-1">min</span>
      </div>
      <span className="text-foreground font-bold text-lg">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-foreground text-background font-bold text-lg px-2 py-1 rounded-md min-w-[2.5rem] text-center">
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className="text-xs text-muted-foreground mt-1">sec</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
