import { mount } from '@vue/test-utils'
import AgendaPage from '@/views/AgendaPage.vue'

describe('Tab1Page.vue', () => {
  it('renders tab 1 Tab1Page', () => {
    const wrapper = mount(AgendaPage)
    expect(wrapper.text()).toMatch('Agenda page')
  })
})
