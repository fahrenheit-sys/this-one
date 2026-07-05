type IconProps = {
  className?: string;
};

const base = "1.4";

export function IconVitamins({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="7" y="3" width="8" height="4" rx="1" />
      <path d="M6 7h10v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" />
      <path d="M6 13h10" />
      <circle cx="16" cy="18" r="2.4" />
      <circle cx="18.6" cy="20.4" r="2.4" />
    </svg>
  );
}

export function IconSkincare({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 4c1-1.3 5-1.3 6 0 1 1.3.5 2.6 0 3.5-.6 1-1 1.8-1 3.5H10c0-1.7-.4-2.5-1-3.5C8.5 6.6 8 5.3 9 4Z" />
      <path d="M7 11h10v7a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3z" />
      <path d="M7 15h10" />
    </svg>
  );
}

export function IconFragrance({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 3.5 15 5" />
      <circle cx="16" cy="6" r="1.4" />
      <path d="M10 8h4l1 2h-6z" />
      <path d="M8 10h8v8a4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
      <path d="M8 15h8" />
    </svg>
  );
}

export function IconBone({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 6a2.2 2.2 0 1 1 3.6 1.7l5.1 5.1A2.2 2.2 0 1 1 16.4 16l-5.1-5.1A2.2 2.2 0 1 1 6 6Z" />
      <path d="M6 18a2.2 2.2 0 1 0 3.6-1.7M14.4 9.7A2.2 2.2 0 1 1 18 8" />
    </svg>
  );
}

export function IconBrain({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 8 17a3 3 0 0 0 3-2.8V6a2 2 0 0 0-2-2Z" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8A3 3 0 0 1 16 17a3 3 0 0 1-3-2.8V6a2 2 0 0 1 2-2Z" />
      <path d="M12 8v6M9 20h6" />
    </svg>
  );
}

export function IconVirus({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="9.5" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="13.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="14" cy="10" r="0.6" fill="currentColor" stroke="none" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M18.4 5.6l-2 2M7.6 16.4l-2 2" />
    </svg>
  );
}

export function IconStomach({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 4c0 2-2 2.5-2 5.5C6 15 8 19 12.5 19c3 0 5.5-2 5.5-5 0-2-1.5-2.5-1.5-4.5S18 6 16.5 4.5" />
      <circle cx="13.5" cy="13" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconEnergy({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 3 6 13h5l-1 8 8-11h-5z" />
    </svg>
  );
}

export function IconEye({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M16 6.5 17 4" />
    </svg>
  );
}

export function IconStethoscope({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 4v5a4 4 0 0 0 8 0V4" />
      <path d="M11 13v2a4 4 0 0 0 8 0v-1.5" />
      <circle cx="19" cy="11" r="1.4" />
      <circle cx="8.5" cy="18.5" r="2.3" />
    </svg>
  );
}

export function IconHand({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 21c-2-2-3.5-4.3-3.5-6.5S5.5 12 6.5 12s1.7.8 1.7 2" />
      <path d="M8.2 13V6.5a1.4 1.4 0 0 1 2.8 0V12M11 12V5a1.4 1.4 0 0 1 2.8 0v7M13.8 12V6a1.4 1.4 0 0 1 2.8 0v7.5" />
      <path d="M16.6 12.5A1.4 1.4 0 0 1 19 13.5V16c0 3-2 5-4 5H10" />
      <circle cx="9" cy="9" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconHeartPulse({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20.5S3.5 14.8 3.5 9a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20.5 9c0 1.2-.3 2.3-.9 3.4" />
      <path d="M4.5 13h3l1.5-3 2 5 1.5-3H16" />
    </svg>
  );
}

export function IconBabyHand({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 13a4 4 0 0 1 8 0v2a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4z" />
      <path d="M8 13v-2M11 13v-2.6M14 13v-2" />
      <circle cx="17" cy="7" r="2.4" />
    </svg>
  );
}

export function IconMolecule({
  className = "h-12 w-12",
  label,
}: IconProps & { label: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="8.5" cy="17" r="2.6" />
      <circle cx="15.5" cy="17" r="2.6" />
      <path d="M10.6 15.3 13.4 15.3" />
      <circle cx="12" cy="8.5" r="4.5" />
      <text x="12" y="10.3" textAnchor="middle" fontSize="4.6" fill="currentColor" stroke="none" fontWeight="700">
        {label}
      </text>
    </svg>
  );
}

export function IconCollagen({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path
        fill="currentColor"
        stroke="none"
        d="M7 6 10 4.3 13 6v3.4L10 11 7 9.4Z"
      />
      <path
        fill="currentColor"
        stroke="none"
        d="M11 12 14 10.3 17 12v3.4L14 17l-3-1.6Z"
      />
    </svg>
  );
}

export function IconJoint({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 5c1.6.3 2.8 1.7 2.6 3.4-.2 1.4-1.2 2-1.2 3.3 0 1.6 1.4 2.2 1.9 3.6.6 1.7-.3 3.5-2 4.1" />
      <path d="M9 5.2 8 4M18 8l1.3-.6M17.5 15l1.4.5" />
    </svg>
  );
}

export function IconCapsule({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="9" width="16" height="6" rx="3" />
      <path d="M12 9v6" />
    </svg>
  );
}

export function IconTablet({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="6.5" />
      <path d="M6 12h12" />
    </svg>
  );
}

export function IconPowder({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 5h10l-1.5 4h-7z" />
      <path d="M6.5 9h11l-1 10H7.5z" />
      <path d="M9 12.5 8.6 15M12 12.5v3M15 12.5l.4 2.5" />
    </svg>
  );
}

export function IconLiquid({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 3h6" />
      <path d="M9 3v3.5c0 1-.6 1.4-1.2 2.1A6 6 0 0 0 6 12.8V19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6.2a6 6 0 0 0-1.8-4.2C15.6 7.9 15 7.5 15 6.5V3" />
      <path d="M6.5 15h11" />
    </svg>
  );
}

export function IconGummi({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 4c1.5 0 2 1.3 2 2.5 0 .8-.3 1.2-.3 1.2S12 7 13.5 7.8c1.2.6 1.5 1.7 1.2 2.6 0 0 1.8.6 1.8 2.6 0 2.6-2.2 5-5.5 5s-5.5-2-6-4.5C4.5 11 5 9 6.7 8.2 6.3 7.2 6.8 4 9 4Z" />
      <circle cx="10.5" cy="14" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="12.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCreamJar({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 7c1.5-1.5 6.5-1.5 8 0" />
      <rect x="5.5" y="7" width="13" height="4" rx="1.5" />
      <path d="M6 11h12v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" />
    </svg>
  );
}

export function IconSupport({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="5" rx="1.5" />
      <rect x="17" y="13" width="4" height="5" rx="1.5" />
      <path d="M19 18v1a3 3 0 0 1-3 3h-3" />
    </svg>
  );
}

export function IconStepRing({
  step,
  total,
  className = "h-4 w-4",
}: {
  step: number;
  total: number;
  className?: string;
}) {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (step / total) * circumference;

  return (
    <svg viewBox="0 0 20 20" className={className}>
      <circle cx="10" cy="10" r={radius} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <circle
        cx="10"
        cy="10"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 10 10)"
      />
    </svg>
  );
}
