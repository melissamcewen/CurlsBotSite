import { AnalysisResult } from 'haircare-ingredients-analyzer';
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Droplets,
  Sparkles,
  Brush,
  Droplet,
  Beaker,
  Sprout,
  BarChart3,
  HelpCircle,
  SprayCan,
  Icon,
  FlaskConical,
  Factory,
  Wind,
} from 'lucide-react';
import Link from 'next/link';
import { candlestickBigLit, bottleDispenser, soapBar } from '@lucide/lab';

interface Props {
  result: AnalysisResult;
}

type StatusType = 'ok' | 'caution' | 'warning';

// Mapping of labels to their guide URLs
const GUIDE_URLS: Record<string, string> = {
  Sulfates: '/categories/sulfates',
  Silicones: '/groups/silicones',
  Waxes: '/groups/waxes',
  Soap: '/categories/soaps',
  Astringents: '/categories/astringents',
  Petroleum: '/categories/petroleum-oils',
  Parabens: '/categories/parabens',
  'Drying Alcohols': '/groups/alcohols',
};

export function AnalysisSummary({ result }: Props) {
  const { status, reasons } = result;

  // Helper function to check if a specific setting exists in reasons
  const hasReason = (setting: string) =>
    reasons.some((r) => r.setting === setting);

  // Get status color classes
  const getStatusClasses = (status: StatusType) => {
    switch (status) {
      case 'ok':
        return {
          bg: 'bg-info/10',
          text: 'text-info',
          icon: <CheckCircle className="w-6 h-6 text-info" />,
        };
      case 'caution':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          icon: <AlertTriangle className="w-6 h-6 text-warning" />,
        };
      case 'warning':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          icon: <XCircle className="w-6 h-6 text-error" />,
        };
      default:
        return {
          bg: 'bg-info/10',
          text: 'text-info',
          icon: <CheckCircle className="w-6 h-6 text-info" />,
        };
    }
  };

  // Get status display text
  const getStatusDisplay = (item: (typeof statusItems)[0]) => {
    switch (item.label) {
      case 'Overall Status':
        return item.status === 'ok'
          ? 'Approved'
          : item.status.charAt(0).toUpperCase() + item.status.slice(1);
      case 'Sulfates':
        return item.status === 'ok' ? 'Sulfate Free' : 'Contains Sulfates';
      case 'Silicones':
        if (item.status === 'ok') return 'Silicone Free';
        if (item.status === 'caution') return 'Water Soluble';
        return 'Non-Water Soluble';
      case 'Waxes':
        return item.status === 'ok' ? 'Wax Free' : 'Contains Waxes';
      case 'Soap':
        return 'Contains Soap';
      case 'Astringents':
        return 'Contains Astringents';
      case 'Petroleum':
        return 'Contains Petroleum Oils';
      case 'Parabens':
        return 'Contains Parabens';
      case 'Drying Alcohols':
        return item.status === 'ok'
          ? 'Drying Alcohol Free'
          : 'Contains Drying Alcohols';
      default:
        return item.status === 'ok' ? 'OK' : item.status;
    }
  };

  // Determine silicone status
  const getSiliconeStatus = () => {
    if (hasReason('no_water_insoluble_silicones')) return 'warning' as const;
    if (hasReason('caution_silicones')) return 'caution' as const;
    return 'ok' as const;
  };

  // Convert status to StatusType
  const getOverallStatus = (status: string): StatusType => {
    if (status === 'ok' || status === 'caution' || status === 'warning') {
      return status;
    }
    return 'warning';
  };

  const statusItems = [
    {
      label: 'Overall Status',
      status: getOverallStatus(status),
      icon: <BarChart3 className="w-6 h-6" />,
      show: true,
    },
    {
      label: 'Sulfates',
      status: hasReason('sulfate_free')
        ? ('warning' as const)
        : ('ok' as const),
      icon: <Icon iconNode={bottleDispenser} className="w-6 h-6" />,
      show: true,
    },
    {
      label: 'Silicones',
      status: getSiliconeStatus(),
      icon: <FlaskConical className="w-6 h-6" />,
      show: true,
    },
    {
      label: 'Waxes',
      status: hasReason('no_waxes') ? ('warning' as const) : ('ok' as const),
      icon: <Icon iconNode={candlestickBigLit} />,
      show: true,
    },
    {
      label: 'Drying Alcohols',
      status: hasReason('drying_alcohol')
        ? ('warning' as const)
        : ('ok' as const),
      icon: <SprayCan className="w-6 h-6" />,
      show: true,
    },
    {
      label: 'Soap',
      status: hasReason('soap_free') ? ('warning' as const) : ('ok' as const),
      icon: <Icon iconNode={soapBar} className="w-6 h-6" />,
      show: hasReason('soap_free'),
    },
    {
      label: 'Astringents',
      status: hasReason('no_astringents')
        ? ('caution' as const)
        : ('ok' as const),
      icon: <Wind className="w-6 h-6" />,
      show: hasReason('no_astringents'),
    },
    {
      label: 'Petroleum',
      status: hasReason('no_petroleum')
        ? ('warning' as const)
        : ('ok' as const),
      icon: <Factory className="w-6 h-6" />,
      show: hasReason('no_petroleum'),
    },
    {
      label: 'Parabens',
      status: hasReason('paraben_caution')
        ? ('caution' as const)
        : ('ok' as const),
      icon: <Beaker className="w-6 h-6" />,
      show: hasReason('paraben_caution'),
    },
  ];

  return (
    <div className="bg-base-100 cb-card-lite">
      <h2 className="cb-header">
        <BarChart3 className="cb-header-icon" />
        Analysis Summary
      </h2>
      <div className="flex flex-col gap-2">
        {statusItems
          .filter((item) => item.show)
          .map((item) => {
            const classes = getStatusClasses(item.status);
            return (
              <div
                key={item.label}
                className={`flex items-center justify-between p-4 ${classes.bg} rounded-lg`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <div>
                    {item.label === 'Overall Status' ? (
                      item.label
                    ) : (
                      <Link
                        href={GUIDE_URLS[item.label] || '/'}
                        className="underline hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                </div>
                <div className={`flex items-end gap-2 ${classes.text}`}>
                  <span className="text-md font-medium">
                    {getStatusDisplay(item)}
                  </span>
                  {item.status === 'ok' && <CheckCircle className="w-5 h-5" />}
                  {item.status === 'warning' && <XCircle className="w-5 h-5" />}
                  {item.status === 'caution' && (
                    <HelpCircle className="w-5 h-5" />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
