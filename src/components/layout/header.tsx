import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
  meta?: React.ReactNode;
}

export function Header({ title, description, action, meta }: HeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {description && (
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        )}
        {meta && <div className="mt-2">{meta}</div>}
      </div>
      {action && (
        <Button size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
