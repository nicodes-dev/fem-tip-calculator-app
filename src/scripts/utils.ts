import {
  billInput,
  btnReset,
  customInput,
  initialState,
  personInput,
} from './main'

const containsWhitespace = (el: HTMLInputElement): boolean => {
  return /\s/.test(el.value)
}

export const validateInput = (inputEl: HTMLInputElement): string | number => {
  const value = Number(inputEl.value)

  if (containsWhitespace(inputEl) || value < 0 || isNaN(value)) {
    return 'Invalid input'
  } else if (inputEl.value.length === 0) {
    return ''
  } else if (value === 0) {
    return "Can't be zero"
  }
  return value
}

export const createErrorMessage = (el: HTMLInputElement, hasError: boolean) => {
  if (hasError) {
    el.classList.remove('default-input-hover')
    el.classList.add('invalid')
  } else {
    el.classList.add('default-input-hover')
    el.classList.remove('invalid')
  }
}

export const resetInputValue = (el: HTMLInputElement): void => {
  initialState.bill = el.id === billInput.id ? 0 : initialState.bill

  initialState.personCount =
    el.id === personInput.id ? 0 : initialState.personCount

  initialState.selectedTip =
    el.id === customInput.id ? 0 : initialState.selectedTip
}

export const validateAndGetResult = () => {
  console.log('selectedtip', initialState.selectedTip)
  if (
    initialState.bill > 0 &&
    initialState.selectedTip > 0 &&
    initialState.personCount > 0
  ) {
    initialState.tipAmount =
      (initialState.bill / initialState.personCount) * initialState.selectedTip
    initialState.totalPerPerson = Number(
      (
        initialState.bill / initialState.personCount +
        initialState.tipAmount
      ).toFixed(2)
    )

    btnReset.classList.add('active')
    btnReset.removeAttribute('disabled')
  } else {
    btnReset.classList.remove('active')
    btnReset.setAttribute('disabled', '')
  }

  console.log(initialState.totalPerPerson, initialState.tipAmount)
}

export const createErrorEl = (
  el: HTMLInputElement | HTMLButtonElement,
  errMsg: string = '',
  className: string = 'error'
) => {
  const errorEl = document.createElement('span') as HTMLSpanElement

  const errEl = el.parentElement?.querySelector('span')

  if (errEl) {
    errEl.remove()
  }

  errorEl.textContent = errMsg

  if (el.id === customInput.id && errMsg.length !== 0) {
    errorEl.classList.add('custom-error')
    el.before(errorEl)
  } else if (el.id !== customInput.id && errMsg.length !== 0) {
    errorEl.classList.add(className)
    el.before(errorEl)
  } else {
    errEl?.remove()
  }
}

export const renderDOMValues = (
  tipEl: HTMLParagraphElement,
  totalEl: HTMLParagraphElement
) => {
  const decimalPoint = initialState.tipAmount.toString().indexOf('.')

  const values = {
    newTip: '0.00',
    newTotal: '0.00',
  }

  if (
    initialState.bill > 0 &&
    initialState.selectedTip > 0 &&
    initialState.personCount > 0
  ) {
    values.newTip = initialState.tipAmount
      .toString()
      .split('')
      .splice(0, decimalPoint + 3)
      .join('')

    values.newTotal = initialState.totalPerPerson.toString()
  } else {
    values.newTip = '0.00'
    values.newTotal = '0.00'
  }

  tipEl.textContent = `$${values.newTip}`
  totalEl.textContent = `$${values.newTotal}`
}
