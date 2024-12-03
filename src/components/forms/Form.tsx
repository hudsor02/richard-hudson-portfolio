'use client';

import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

const Form = FormProvider;

// Define context type for FormField
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

// Context to manage individual form field state
const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(
  undefined
);

// The FormField component manages individual form fields
const FormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// Hook to access form field state and error messages
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField must be used within a <FormField>');
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    name: fieldContext.name,
    error: fieldState.error,
  };
};

// Context to manage form item state, including unique ID
type FormItemContextValue = {
  id: string;
};
const FormItemContext = React.createContext<FormItemContextValue | undefined>(
  undefined
);

// FormItem Component to group label, input, and helper elements together
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

// FormLabel component connected to a FormItem and associated input
const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const field = useFormField();
  const formItemContext = React.useContext(FormItemContext);

  if (!formItemContext) {
    throw new Error('FormLabel must be used within a <FormItem>');
  }

  return (
    <Label
      ref={ref}
      className={cn(field.error && 'text-red-500 dark:text-red-400', className)}
      htmlFor={formItemContext.id}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

// FormControl component for connecting controls with label and errors
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const field = useFormField();
  const formItemContext = React.useContext(FormItemContext);

  if (!formItemContext) {
    throw new Error('FormControl must be used within a <FormItem>');
  }

  return (
    <Slot
      ref={ref}
      id={formItemContext.id}
      aria-describedby={field.error ? `${formItemContext.id}-error` : undefined}
      aria-invalid={!!field.error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

// FormDescription to provide additional information about form controls
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const formItemContext = React.useContext(FormItemContext);

  if (!formItemContext) {
    throw new Error('FormDescription must be used within a <FormItem>');
  }

  return (
    <p
      ref={ref}
      id={`${formItemContext.id}-description`}
      className={cn(
        'text-sm text-neutral-500 dark:text-neutral-400',
        className
      )}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

// FormMessage component for displaying validation messages
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const field = useFormField();
  const formItemContext = React.useContext(FormItemContext);

  if (!formItemContext) {
    throw new Error('FormMessage must be used within a <FormItem>');
  }

  const body = field.error?.message || children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={`${formItemContext.id}-error`}
      role="alert"
      className={cn(
        'text-sm font-medium text-red-500 dark:text-red-400',
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};
