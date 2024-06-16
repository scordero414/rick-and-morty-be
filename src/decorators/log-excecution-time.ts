type MethodDecorator = (
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) => void;

const logExecutionTime =
  (): MethodDecorator =>
  (
    _: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ): void => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const startTime = performance.now();
      const result = originalMethod.apply(this, args);
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      console.log(
        `\nDECORATOR:::: The method ${propertyKey} took ${executionTime.toFixed(
          2
        )} milliseconds to complete. \n\n`
      );

      return result; // Return the result of the original method
    };
  };

export default logExecutionTime;
