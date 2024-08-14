import {Solver2} from './Solver2';

describe('Solver2', () => {
  describe('calculate()', () => {
    it('solves testcase 1', () => {
      expect(new Solver2().calculate()).toEqual(5);
    });
  });
});
