export const adder = (arg1: number, arg2: number) => {
  return arg1 + arg2;
};

export default function multiplier(arg1: number, arg2: number) {
  return arg1 * arg2;
}

export class MyClass {
  public somePropToTestConstructorMock;
  constructor(private ownProp: number) {
    this.somePropToTestConstructorMock = 1234;
  }

  method1(value: string) {
    return `${value}_postfixed_${this.ownProp}_${this.somePropToTestConstructorMock}`;
  }

  method2(value: number) {
    return value + 65 + this.ownProp + this.somePropToTestConstructorMock;
  }

  static methodStatic(value: number) {
    return value + 650;
  }

  get methodGetter() {
    return 'getterMethod';
  }
}
