import { expressApp, jwtDecode, axiosPut } from '..';
import express from 'express';
import { decode } from 'jsonwebtoken';
import axios from 'axios';

jest.mock('express');
jest.mock('jsonwebtoken');
jest.mock('axios');

describe('auto mock default import', () => {
  test('is function', () => {
    const returnValue = expressApp();
    expect(returnValue).toEqual(undefined);
    expect(express).toBeCalledTimes(1);
  });
  test('is object', () => {
    const returnValue = axiosPut();
    expect(returnValue).toEqual(undefined);
    expect(axios.put).toBeCalledTimes(1);
  });
});

describe('auto mock named import', () => {
  test('jwt decode', () => {
    const returnValue = jwtDecode();
    expect(returnValue).toEqual(undefined);
    expect(decode).toBeCalledTimes(1);
  });
});
