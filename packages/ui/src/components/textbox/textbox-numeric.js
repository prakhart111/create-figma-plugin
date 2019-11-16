/** @jsx h */
import classnames from '@sindresorhus/class-names'
import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import styles from './textbox.scss'

const UP_KEY_CODE = 38
const DOWN_KEY_CODE = 40

const nonNumericCharactersRegex = /[^\d-.]/

export function TextboxNumeric ({
  focused,
  icon,
  noBorder,
  onChange,
  value,
  ...rest
}) {
  const withIcon = typeof icon !== 'undefined'

  const inputElement = useRef(null)

  function handleFocus () {
    inputElement.current.focus()
    inputElement.current.select()
  }

  function handleKeyDown (event) {
    if (event.keyCode === UP_KEY_CODE || event.keyCode === DOWN_KEY_CODE) {
      event.preventDefault()
      const value = inputElement.current.value
      const isNonNumeric = nonNumericCharactersRegex.test(value) === true
      if (isNonNumeric === true) {
        // Exit if text box contains non-numeric characters
        return
      }
      const number = parseFloat(value)
      const delta = event.shiftKey === true ? 10 : 1
      const significantFiguresCount = countSignificantFigures(value)
      inputElement.current.value = formatValue(
        event.keyCode === UP_KEY_CODE ? number + delta : number - delta,
        significantFiguresCount
      )
      onChange(event)
      handleFocus()
    }
  }

  if (focused === true) {
    useEffect(handleFocus, [])
  }

  return (
    <div
      class={classnames(
        styles.textbox,
        noBorder === true ? styles.noBorder : null,
        withIcon === true ? styles.withIcon : null
      )}
    >
      <input
        {...rest}
        ref={inputElement}
        type='text'
        class={styles.input}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      {withIcon ? <div class={styles.icon}>{icon}</div> : null}
    </div>
  )
}

const fractionalPartRegex = /\.([^.]+)/

function countSignificantFigures (value) {
  const result = fractionalPartRegex.exec(value)
  if (result === null) {
    return 0
  }
  return result[1].length
}

function formatValue (value, significantFiguresCount) {
  if (significantFiguresCount === 0) {
    return value
  }
  const result = fractionalPartRegex.exec(`${value}`)
  if (result === null) {
    return `${value}.${'0'.repeat(significantFiguresCount)}`
  }
  const fractionalPart = result[1]
  const count = significantFiguresCount - fractionalPart.length
  return `${value}${'0'.repeat(count)}`
}