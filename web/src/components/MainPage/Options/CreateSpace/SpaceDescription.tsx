import React from 'react';
import { CustomTextField } from '../../../CustomTextField';
export type SpaceDescriptionProps = {
  className?: string;
  isMultiline?: boolean;
  rows?: number;
};

export const SpaceDescription = ({
  className,
  isMultiline,
  rows,
}: SpaceDescriptionProps) => {
  return (
    <>
      <CustomTextField
        label="Space Description"
        className={className}
        isMultiline={isMultiline}
        rows={6}
      />
    </>
  );
};
