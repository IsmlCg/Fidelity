import {Solver} from './Solver';

describe('Solver', () => {
  describe('calculate()', () => {
    it('solves testcase 1', () => {
      expect(new Solver().calculate()).toEqual(5);
    });
  });
});
