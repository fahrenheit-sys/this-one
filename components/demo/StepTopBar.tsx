import { IconStepRing } from "@/components/icons/DemoIcons";

export default function StepTopBar({
  label,
  step,
  total,
  onBack,
}: {
  label: string;
  step: number;
  total: number;
  onBack?: () => void;
}) {
  return (
    <div className="flex items-start justify-between text-sm text-muted">
      <div>
        <p>{label}</p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-2 flex items-center gap-1 text-muted transition hover:text-brand-dark"
          >
            <span aria-hidden>←</span> Back
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <IconStepRing step={step} total={total} className="h-4 w-4 text-brand" />
        <span>
          {step}/{total}
        </span>
      </div>
    </div>
  );
}
