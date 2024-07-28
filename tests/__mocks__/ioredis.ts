const Redis = jest.fn().mockImplementation(() => {
  return {
    on: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    quit: jest.fn(),
    disconnect: jest.fn(),
  };
});

export default Redis;
