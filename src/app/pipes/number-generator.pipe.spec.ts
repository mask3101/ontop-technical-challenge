import { NumberGeneratorPipe } from './number-generator.pipe';

describe('NumberGeneratorPipe', () => {
  let pipe: NumberGeneratorPipe

  beforeEach(() => {
    pipe = new NumberGeneratorPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('test return value', () => {
    expect(pipe.transform(5)).toEqual([1,2,3,4,5,6])
  })
});
