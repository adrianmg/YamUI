/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import CustomizableSuggestionsListItem, { SuggestionsListItem } from './SuggestionsListItem';
import { SuggestionItem, SuggestionsListItemTemplate, SuggestionsListItemProps } from './SuggestionsList.types';
import Customizer, { defaultTheme } from '../Customizer';

describe('<SuggestionsListItem />', () => {
  let component: ShallowWrapper<SuggestionsListItemProps>;
  let onSelect: jest.Mock;

  const textItem: SuggestionItem = {
    template: SuggestionsListItemTemplate.TEXT,
    id: '1',
    name: 'John Smith',
  };

  const getProps = (overrides?: Partial<SuggestionsListItemProps>) => {
    onSelect = jest.fn();

    return {
      onSelect,
      isSelected: false,
      searchText: 'Joh',
      item: textItem,
      ...overrides,
    };
  };

  beforeEach(() => {
    onSelect = jest.fn();
  });

  describe('when isSelected=true', () => {
    beforeEach(() => {
      component = shallow(<SuggestionsListItem {...getProps({ isSelected: true })} />);
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('when selecting', () => {
    let preventDefault: jest.Mock;

    beforeEach(() => {
      component = shallow(<SuggestionsListItem {...getProps()} />);
      preventDefault = jest.fn();
      component.simulate('mouseDown', { preventDefault });
    });

    it('calls props.onSelect', () => {
      expect(onSelect).toBeCalled();
    });

    it('calls event preventDefault', () => {
      expect(preventDefault).toBeCalled();
    });
  });

  describe('with customizer', () => {
    let mountedComponent: ReactWrapper;
    const theme = defaultTheme;

    beforeEach(() => {
      mountedComponent = mount(
        <Customizer settings={{ theme }}>
          <CustomizableSuggestionsListItem {...getProps({ isSelected: true })} />
        </Customizer>,
      );
    });

    it('receives custom theme', () => {
      expect(mountedComponent.find('CustomizableSuggestionsListItem').prop('theme')).toBe(theme);
    });
  });
});
