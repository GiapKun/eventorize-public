import React from "react";
import { FormProvider as Form } from "react-hook-form";

interface FormProviderProps {
  className?: string;
  children: React.ReactNode;
  methods: any;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export default function FormProvider({
  className,
  children,
  onSubmit,
  methods,
}: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className}>{children}</form>
    </Form>
  );
}
