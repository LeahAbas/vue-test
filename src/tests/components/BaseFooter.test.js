/**
 * @vitest-environment happy-dom
 */

import BaseFooter from "../../components/BaseFooter.vue"
import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils';


describe('Renders the footer correctly', () => {
    const wrapper = mount(BaseFooter);

    test('renders the current year in the footer', () => {
    const currentYear = new Date().getFullYear();
    
    expect(wrapper.text()).toContain(`© Weather-Advisor ${currentYear}`);
    });


    wrapper.unmount();
})