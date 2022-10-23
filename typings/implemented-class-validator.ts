export type InterfaceValidator<Class, ImplementedInterface> = Class extends ImplementedInterface
  ? Exclude<keyof Class, keyof ImplementedInterface> extends never
    ? Class
    : never
  : ImplementedInterface;
