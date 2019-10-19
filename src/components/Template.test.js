import React from 'react';
import { shallow } from 'enzyme';
import Template from './Template';
describe('Template', () => {
  it('should render correctly in "debug" mode', () => {
    const template = shallow(<Template debug />);
  
    expect(template).toMatchSnapshot();
  });
});