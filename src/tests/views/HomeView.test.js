/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue'; 

describe('HomeView', () => {
  it('renders the component', async () => {
    const wrapper = mount(HomeView);

    expect(wrapper.find('.home-container').exists()).toBe(true);

    expect(wrapper.find('.home-input-container').exists()).toBe(true);
    expect(wrapper.find('.home-city-list').exists()).toBe(true);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapboxResult).toBe(null);
    expect(wrapper.vm.searchError).toBe(false);
  });


});
