import express from 'express';
import { decode, sign } from 'jsonwebtoken';
import multiplier, { MyClass, adder } from './utils';
import axios from 'axios';

export const expressApp = () => {
  const app = express();
  return app;
};

export const jwtDecode = () => {
  const decoded = decode('');
  return decoded;
};

export const axiosPut = () => {
  const axiosGetReturnValue = axios.put('');
  return axiosGetReturnValue;
};

export const axiosPutGet = async () => {
  const axiosPutReturnValue = await axios.put('');
  const axiosGetReturnValue = (await axios.get('https://jsonplaceholder.typicode.com/todos/1')).data;
  return { axiosGetReturnValue, axiosPutReturnValue };
};

export const jwtSignAndDecode = ({ payload, secret }: { payload: string; secret: string }) => {
  const signed = sign(payload, secret);
  const decoded = decode('');
  return { decoded, signed };
};

export const localFunction = (arg1: number, arg2: number) => {
  return multiplier(arg1, arg2) + adder(10, 10);
};

export const classInstantiatedInside = ({ stringVal, numberVal }: { stringVal: string; numberVal: number }) => {
  const ownProp = 15;
  const myInstance = new MyClass(ownProp);
  const stringReturn = myInstance.method1(stringVal);
  const numberReturn = myInstance.method2(numberVal);
  const getterReturnValue = myInstance.methodGetter;
  return { stringReturn, numberReturn, getterReturnValue };
};

export const functionThatDependsOnFunction = (func: (a: string) => string, arg: string) => {
  const stringGotten = func(arg);
  return `${stringGotten}_postfix-56`;
};

export const functionThatDependsOnClassInstance = ({
  classInstance,
  arg1,
  arg2,
}: {
  classInstance: MyClass;
  arg1: string;
  arg2: number;
}) => {
  const method1Value = classInstance.method1(arg1);
  const method2Value = classInstance.method2(arg2);
  return `${method1Value}_${method2Value}`;
};
