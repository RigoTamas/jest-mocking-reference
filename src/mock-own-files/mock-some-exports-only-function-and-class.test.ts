import { localFunction, classInstantiatedInside } from '..';
import * as utils from '../utils';

describe('keep everything, mock some exports only', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  describe('mock functions', () => {
    test('mock default import', () => {
      const multiplierMock = jest.spyOn(utils, 'default');
      multiplierMock.mockReturnValue(1500);
      const result = localFunction(10, 20);
      expect(result).toEqual(1520);
      expect(multiplierMock).toBeCalledTimes(1);
    });
    test('mock named import', () => {
      const adderMock = jest.spyOn(utils, 'adder');
      adderMock.mockReturnValue(1);
      const result = localFunction(10, 20); // 10 * 20 + 1
      expect(result).toEqual(201);
      expect(adderMock).toBeCalledTimes(1);
    });
    test('mock everything', () => {
      const multiplier = jest.spyOn(utils, 'default');
      const adder = jest.spyOn(utils, 'adder');
      (multiplier as any as jest.Mock).mockReturnValue(1500);
      (adder as any as jest.Mock).mockReturnValue(1);
      const result = localFunction(10, 20);
      expect(result).toEqual(1501);
      expect(multiplier).toBeCalledTimes(1);
      expect(multiplier).toBeCalledTimes(1);
    });
  });
  describe('mock classes', () => {
    test('explicit mocking of method1', () => {
      const method1Spy = jest.spyOn(utils.MyClass.prototype, 'method1').mockReturnValue('asd-return');
      const result = classInstantiatedInside({ numberVal: 15, stringVal: 'string-val' });
      expect(result).toEqual({ numberReturn: 1329, stringReturn: 'asd-return', getterReturnValue: 'getterMethod' });
      expect(method1Spy).toBeCalledTimes(1);
    });
    test('explicit mocking of method2', () => {
      const method2Spy = jest.spyOn(utils.MyClass.prototype, 'method2').mockReturnValue(156);
      const result = classInstantiatedInside({ numberVal: 15, stringVal: 'string-val' });
      expect(result).toEqual({ numberReturn: 156, stringReturn: 'string-val_postfixed_15_1234', getterReturnValue: 'getterMethod' });
      expect(method2Spy).toBeCalledTimes(1);
    });
    test('static method mocking', () => {
      const staticMethodSpy = jest.spyOn(utils.MyClass, 'methodStatic').mockReturnValue(1998);
      const staticReturnValue = utils.MyClass.methodStatic(98);
      expect(staticReturnValue).toEqual(1998);
      expect(staticMethodSpy).toBeCalledTimes(1);
    });
    test('getter method mocking', () => {
      const getterMethodSpy = jest.spyOn(utils.MyClass.prototype, 'methodGetter', 'get').mockReturnValue('get-mock-value-1238');
      const result = classInstantiatedInside({ numberVal: 15, stringVal: 'string-val' });
      expect(result).toEqual({
        numberReturn: 1329,
        stringReturn: 'string-val_postfixed_15_1234',
        getterReturnValue: 'get-mock-value-1238',
      });
      expect(getterMethodSpy).toBeCalledTimes(1);
    });
  });
});
