import {
  makeActionCreator,
  createPathReader
} from '../../src/.internals/helpers';

describe('.internals/helpers/makeActionCrator', () => {
  it('makeActionCrator with string parameter', () => {
    const expectedAction = {
      type: 'TYPE_TEST',
      payload: 'VALUE'
    };
    const simpleActionCreator = makeActionCreator('TYPE_TEST');

    expect(simpleActionCreator('VALUE')).toEqual(expectedAction);
  });

  it('makeActionCrator with object parameter', () => {
    const expectedAction = {
      type: 'TYPE_TEST',
      payload: 'VALUE'
    };
    const simpleActionCreator = makeActionCreator({ type: 'TYPE_TEST' });

    expect(simpleActionCreator('VALUE')).toEqual(expectedAction);
  });
});

describe('.internals/helpers/createPathReader', () => {
  it('createPathReader for level 3', () => {
    const data = { x: { y: { z: 'goal!' } } };
    const read = createPathReader('x.y.z');

    expect(read(data)).toEqual('goal!');
  });

  it('createPathReader for non existing field in the middle', () => {
    const data = { x: { y: { z: 'goal!' } } };
    const read = createPathReader('x.p.z');

    expect(read(data)).toBeUndefined();
  });

  it('createPathReader for non existing field at the beginning', () => {
    const data = {};
    const read = createPathReader('x.y.z');
    expect(read(data)).toBeUndefined();
  });

  it('createPathReader for non existing field at the end', () => {
    const data = { x: { y: { z: 'goal!' } } };
    const read = createPathReader('x.y.p');

    expect(read(data)).toBeUndefined();
  });
});
