/** @jsx h */
/* eslint-disable no-console */
import { h, JSX } from 'preact'
import { useState } from 'preact/hooks'

import { useInitialFocus } from '../../../hooks/use-initial-focus/use-initial-focus'
import { IconEllipsis32 } from '../../icon/icon-32/icon-ellipsis-32'
import { IconToggleButton } from '../icon-toggle-button'

export default { title: 'Components/Icon Toggle Button' }

export const Unselected = function () {
  const [value, setValue] = useState(false)
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <IconToggleButton onChange={handleChange} value={value}>
      <IconEllipsis32 />
    </IconToggleButton>
  )
}

export const UnselectedFocused = function () {
  const [value, setValue] = useState(false)
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <IconToggleButton
      {...useInitialFocus()}
      onChange={handleChange}
      value={value}
    >
      <IconEllipsis32 />
    </IconToggleButton>
  )
}

export const UnselectedDisabled = function () {
  function handleChange() {
    throw new Error('This function should not be called')
  }
  return (
    <IconToggleButton disabled onChange={handleChange} value={false}>
      <IconEllipsis32 />
    </IconToggleButton>
  )
}

export const Selected = function () {
  const [value, setValue] = useState(true)
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <IconToggleButton onChange={handleChange} value={value}>
      <IconEllipsis32 />
    </IconToggleButton>
  )
}

export const SelectedFocused = function () {
  const [value, setValue] = useState(true)
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <IconToggleButton
      {...useInitialFocus()}
      onChange={handleChange}
      value={value}
    >
      <IconEllipsis32 />
    </IconToggleButton>
  )
}

export const SelectedDisabled = function () {
  function handleChange() {
    throw new Error('This function should not be called')
  }
  return (
    <IconToggleButton disabled onChange={handleChange} value={true}>
      <IconEllipsis32 />
    </IconToggleButton>
  )
}

export const OnValueChange = function () {
  const [value, setValue] = useState(false)
  return (
    <IconToggleButton onValueChange={setValue} value={value}>
      <IconEllipsis32 />
    </IconToggleButton>
  )
}