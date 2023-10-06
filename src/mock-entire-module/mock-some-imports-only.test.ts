import { axiosPutGet, jwtSignAndDecode } from '..';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'), // only the decode function will be a mock, all the other functions will be the original implementation
  decode: jest.fn(),
}));
jest.mock('axios', () => ({
  ...jest.requireActual('axios'), // only the decode function will be a mock, all the other functions will be the original implementation
  put: jest.fn(),
}));

describe('default import', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // needed to reset the mockReturnValue
  });
  test('axios', async () => {
    const mockPutValue = 'putReturn';
    (axios.put as any as jest.Mock).mockResolvedValue(mockPutValue);
    const returnValue = await axiosPutGet();
    expect(returnValue).toEqual({
      axiosPutReturnValue: mockPutValue,
      axiosGetReturnValue: {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
    });
    expect(axios.put).toBeCalledTimes(1);
  });
});

describe('named import', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // needed to reset the mockReturnValue
  });
  test('jwt 1', () => {
    const mockReturnedValue = 'decoded string';
    (jwt.decode as any as jest.Mock).mockReturnValue(mockReturnedValue);
    const returnValue = jwtSignAndDecode({ payload: 'asd', secret: 'secret' });
    expect(returnValue).toEqual({
      decoded: mockReturnedValue,
      signed: 'eyJhbGciOiJIUzI1NiJ9.YXNk.QNa-p8QpuHcVUDMN_Ih4x4vidWp31365GM4zrSr3t0s',
    });
    expect(jwt.decode).toBeCalledTimes(1);
  });

  test('jwt 2, no explicit mock', () => {
    const returnValue = jwtSignAndDecode({ payload: 'asd', secret: 'secret' });
    expect(returnValue).toEqual({
      decoded: undefined,
      signed: 'eyJhbGciOiJIUzI1NiJ9.YXNk.QNa-p8QpuHcVUDMN_Ih4x4vidWp31365GM4zrSr3t0s',
    });
    expect(jwt.decode).toBeCalledTimes(1);
  });

  test('jwt 3', () => {
    const mockReturnedValue = 1234;
    (jwt.decode as any as jest.Mock).mockReturnValue(mockReturnedValue);
    const returnValue = jwtSignAndDecode({ payload: 'asd', secret: 'secret' });
    expect(returnValue).toEqual({
      decoded: mockReturnedValue,
      signed: 'eyJhbGciOiJIUzI1NiJ9.YXNk.QNa-p8QpuHcVUDMN_Ih4x4vidWp31365GM4zrSr3t0s',
    });
    expect(jwt.decode).toBeCalledTimes(1);
  });
});
