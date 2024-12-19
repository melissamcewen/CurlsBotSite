import { getStatusConfig } from '../utils/statusConfig';

interface StatusIndicatorProps {
  status: string;
  showDot?: boolean;
}

export function StatusIndicator({ status, showDot = true }: StatusIndicatorProps) {
  const { color } = getStatusConfig(status);

  return (
    <div className="flex items-center gap-2">
      {showDot && <div className={`w-3 h-3 rounded-full bg-${color}`} />}
      <span className={`capitalize font-medium text-${color}`}>{status}</span>
    </div>
  );
}
