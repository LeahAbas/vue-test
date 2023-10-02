/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest'
import CityCard from '../../components/CityCard.vue'

describe('CityCard', () => {
  it('renders the correct city name and temperature', () => {
    const city = {
      city: 'Test City',
      state: 'Test State',
      weather: {
        main: {
          temp: 25,
          temp_max: 30,
          temp_min: 20,
        },
      },
    };

    const wrapper = mount(CityCard, {
      props: { city },
    });

    expect(wrapper.find('.top h3').text()).toBe('Test City');
    expect(wrapper.find('.top h1').text()).toBe('25°C');
  });

  it('renders the correct state and temperature range', () => {
    const city = {
      city: 'Test City',
      state: 'Test State',
      weather: {
        main: {
          temp: 25,
          temp_max: 30,
          temp_min: 20,
        },
      },
    };

    const wrapper = mount(CityCard, {
      props: { city },
    });

    expect(wrapper.find('.bottom p').text()).toBe('Test State');
    expect(wrapper.find('.temp span:first-child').text()).toBe('High: 30°C');
    expect(wrapper.find('.temp span:last-child').text()).toBe('Low: 20°C');
  });

});
