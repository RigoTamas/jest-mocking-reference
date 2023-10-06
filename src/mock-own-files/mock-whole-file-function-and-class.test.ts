import { localFunction, classInstantiatedInside } from '..';
import multiplier, { adder, MyClass } from '../utils';

jest.mock('../utils');
// getters cannot have an explicit return value if we are using jest.mock('../utils'). If you need to mock getters, refer to the file ./mock-some-exports-only-function-and-class.test.ts

describe('mock whole file', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  describe('mock functions', () => {
    test('auto mock: no explicit mock implementation, returns undefined', () => {
      const result = localFunction(10, 20);
      expect(result).toEqual(NaN); // undefined + undefined = NaN
      expect(multiplier).toBeCalledTimes(1);
      expect(adder).toBeCalledTimes(1);
    });
    test('explicit mocking', () => {
      (multiplier as any as jest.Mock).mockReturnValue(1500);
      (adder as any as jest.Mock).mockReturnValue(1);
      const result = localFunction(10, 20);
      expect(result).toEqual(1501);
      expect(multiplier).toBeCalledTimes(1);
      expect(multiplier).toBeCalledTimes(1);
    });
  });
  describe('mock classes -> first possibility', () => {
    test('auto mock: no explicit mock implementation, returns undefined', () => {
      const result = classInstantiatedInside({ numberVal: 15, stringVal: 'string-val' });
      expect(result).toEqual({ numberReturn: undefined, stringReturn: undefined, getterReturnValue: undefined }); // auto mock will return undefined by default
    });
    test('explicit mocking of method1', () => {
      const method1Spy = jest.spyOn(MyClass.prototype, 'method1').mockReturnValue('asd-return');
      const result = classInstantiatedInside({ numberVal: 15, stringVal: 'string-val' });
      expect(result).toEqual({ numberReturn: undefined, stringReturn: 'asd-return', getterReturnValue: undefined });
      expect(method1Spy).toBeCalledTimes(1);
    });
    test('explicit mocking of method2', () => {
      const method2Spy = jest.spyOn(MyClass.prototype, 'method2').mockReturnValue(156);
      const result = classInstantiatedInside({ numberVal: 15, stringVal: 'string-val' });
      expect(result).toEqual({ numberReturn: 156, stringReturn: undefined, getterReturnValue: undefined });
      expect(method2Spy).toBeCalledTimes(1);
    });
    test('static method mocking', () => {
      const staticMethodSpy = jest.spyOn(MyClass, 'methodStatic').mockReturnValue(1998);
      const staticReturnValue = MyClass.methodStatic(98);
      expect(staticReturnValue).toEqual(1998);
      expect(staticMethodSpy).toBeCalledTimes(1);
    });
  });
});
