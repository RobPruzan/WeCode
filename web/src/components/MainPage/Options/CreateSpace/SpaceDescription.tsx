import React from 'react';
import { CustomTextField } from '../../../CustomTextField';
import { ChangeHandler } from './CreateSpace';
export type SpaceDescriptionProps = {
  className?: string;
  isMultiline?: boolean;
  rows?: number;
  handleChange: ChangeHandler;
};

export const SpaceDescription = ({
  className,
  isMultiline,
  rows,
  handleChange,
}: SpaceDescriptionProps) => {
  return (
    <>
      <CustomTextField
        label="Space Description"
        className={className}
        isMultiline={isMultiline}
        handleChange={handleChange}
        rows={rows}
      />
    </>
  );
};
