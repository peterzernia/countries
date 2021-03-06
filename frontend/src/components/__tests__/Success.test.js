import React from 'react'
import { shallow } from 'enzyme'
import IconButton from '@material-ui/core/IconButton'
import Success from '../Success'

describe('<Success />', () => {
  it('removes success', () => {
    const removeError = jest.fn()
    const wrapper = shallow(<Success removeError={removeError} success="" />)
    wrapper.find(IconButton).simulate('click')
    expect(removeError).toHaveBeenCalledTimes(1)
  })

  it('display success conditionally', () => {
    const removeError = jest.fn()
    const wrapper = shallow(<Success removeError={removeError} success="" />)
    expect(wrapper.find('p').length).toEqual(0)
    wrapper.setProps({ success: 'test' })
    expect(wrapper.find('p').length).toEqual(1)
  })
})
