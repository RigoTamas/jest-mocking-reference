import { axiosPut, expressApp, jwtDecode } from '..';

import express from 'express';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
jest.mock('express');
jest.mock('axios');
jest.mock('jsonwebtoken');

describe('default import', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // needed to reset the mockReturnValue
  });
  test('is function 1', () => {
    const mockReturnedValue = 'return value';
    (express as any as jest.Mock).mockReturnValue(mockReturnedValue);
    const returnValue = expressApp();
    expect(returnValue).toEqual(mockReturnedValue);
    expect(express).toBeCalledTimes(1);
  });

  test('is function 2', () => {
    const returnValue = expressApp();
    expect(returnValue).toEqual(undefined);
    expect(express).toBeCalledTimes(1);
  });

  test('is function 3', () => {
    const mockReturnedValue = 5;
    (express as any as jest.Mock).mockReturnValue(mockReturnedValue);
    const returnValue = expressApp();
    expect(returnValue).toEqual(mockReturnedValue);
    expect(express).toBeCalledTimes(1);
  });

  test('jwt is object 1', () => {
    const mockReturnedValue = 'something';
    (jwt.decode as any as jest.Mock).mockReturnValue(mockReturnedValue);
    const returnValue = jwtDecode();
    expect(returnValue).toEqual(mockReturnedValue);
    expect(jwt.decode).toBeCalledTimes(1);
  });

  test('jwt is object 2', () => {
    const returnValue = jwtDecode();
    expect(returnValue).toEqual(undefined);
    expect(jwt.decode).toBeCalledTimes(1);
  });

  test('jwt is object 3', () => {
    const mockReturnedValue = 125;
    (jwt.decode as any as jest.Mock).mockReturnValue(mockReturnedValue);
    const returnValue = jwtDecode();
    expect(returnValue).toEqual(mockReturnedValue);
    expect(jwt.decode).toBeCalledTimes(1);
  });

  test('axios is object 3', () => {
    const mockReturnedValue = 'asd-11';
    (axios.put as any as jest.Mock).mockReturnValue(mockReturnedValue);
    const returnValue = axiosPut();
    expect(returnValue).toEqual(mockReturnedValue);
    expect(axios.put).toBeCalledTimes(1);
  });
});
