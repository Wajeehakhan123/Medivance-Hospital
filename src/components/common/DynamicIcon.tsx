import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps extends LucideIcons.LucideProps {
  name: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  // Try to find the icon in lucide-react exports
  const IconComponent = (LucideIcons as Record<string, unknown>)[name] as React.FC<LucideIcons.LucideProps> | undefined;

  if (IconComponent) {
    return <IconComponent {...props} />;
  }

  // Fallback to Stethoscope or Activity
  return <LucideIcons.Activity {...props} />;
};
