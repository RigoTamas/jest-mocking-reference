import { functionThatDependsOnClassInstance, functionThatDependsOnFunction } from '..';
import { MyClass } from '../utils';

describe('dependency injection', () => {
  test('function', () => {
    const mockReturnValue = 'something-12';
    const mockFunc = jest.fn(() => mockReturnValue);
    const returnValue = functionThatDependsOnFunction(mockFunc, 'arg-asd');
    expect(returnValue).toEqual('something-12_postfix-56');
    expect(mockFunc).toBeCalledTimes(1);
    expect(mockFunc).toHaveBeenCalledWith('arg-asd');
  });
  test('class', () => {
    // if we would mock the entire module with jest.mock('../utils')
    // then the MyClass would be a mock class, and we wouldn't need to provide any constructor arguments, eg.:
    // const classInstance = new (MyClass as any)() as MyClass
    // and we could add explicit mockReturnValue-s with jest.spyOn the same way as below
    // this can be convenient if we have many constructor arguments and we don't need to actually supply them because the instance will be a mock anyway.
    const classInstance2 = new (MyClass as any)() as MyClass;
    const classInstance = new MyClass(199); // this is the actual class constructor, so we need to provide arguments for the constructor
    const spy1 = jest.spyOn(classInstance, 'method1').mockReturnValue('baz');
    const spy2 = jest.spyOn(classInstance, 'method2').mockReturnValue(17);
    const returnValue = functionThatDependsOnClassInstance({ classInstance, arg1: 'foo', arg2: 20 });
    expect(returnValue).toEqual('baz_17');
    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });
});
