import React from 'react';
import { CustomTextField } from '../../../CustomTextField';
import { ChangeHandler } from './CreateSpace';
export type SpaceDescriptionProps = {
  className?: string;
  isMultiline?: boolean;
  rows?: number;
  handleChange: ChangeHandler;
  value: string;
};

export const SpaceDescription = ({
  className,
  isMultiline,
  rows,
  handleChange,
  value,
}: SpaceDescriptionProps) => {
  return (
    <>
      <CustomTextField
        value={value}
        label="Space Description"
        className={className}
        isMultiline={isMultiline}
        handleChange={handleChange}
        rows={rows}
      />
    </>
  );
};
