import '../style.css'
import { Calc } from './types.ts'
import {
  createErrorEl,
  createErrorMessage,
  renderDOMValues,
  resetInputValue,
  validateAndGetResult,
  validateInput,
} from './utils'

export const initialState: Calc = {
  bill: 0,
  selectedTip: 0,
  personCount: 0,
  tipAmount: 0,
  totalPerPerson: 0,
}

export const billInput = document.getElementById(
  'bill-input'
) as HTMLInputElement
export const personInput = document.getElementById(
  'people-input'
) as HTMLInputElement
const calcEl = document.getElementById('calc') as HTMLDivElement
export const tipAmountEl = document.getElementById(
  'tip-amount'
) as HTMLParagraphElement
export const totalAmountEl = document.getElementById(
  'total'
) as HTMLParagraphElement
export const customInput = document.getElementById(
  'custom-input'
) as HTMLInputElement
export const btnReset = document.getElementById(
  'btn-reset'
) as HTMLButtonElement
const btnControls: HTMLButtonElement[] = Array.from(
  document.querySelectorAll('[data-id*="tip"]')
)

;[billInput, personInput].forEach(input => {
  input.addEventListener('input', e => {
    const target = e.target as HTMLInputElement

    if (target.value.length === 0) {
      createErrorMessage(target, false)
      createErrorEl(target)
      resetInputValue(target)
      return
    }

    const result = validateInput(target)

    if (typeof result === 'string') {
      createErrorMessage(target, !!result)
      createErrorEl(target, result)
      resetInputValue(target)

      return
    }

    if (target.id === billInput.id) {
      initialState.bill = result
    } else {
      initialState.personCount = result
    }

    createErrorMessage(target, false)
    createErrorEl(target)
  })
})

customInput.addEventListener('input', e => {
  const target = e.target as HTMLInputElement
  if (target.value.length === 0) {
    createErrorMessage(target, false)
    createErrorEl(target)
    resetInputValue(target)
    return
  }

  const result = validateInput(target)

  if (typeof result === 'string') {
    createErrorMessage(target, !!result)
    createErrorEl(target, result)
    resetInputValue(target)
    return
  }
  initialState.selectedTip = result / 100

  validateAndGetResult()
  renderDOMValues(tipAmountEl, totalAmountEl)
})

customInput.addEventListener('focus', e => {
  const target = e.target as HTMLInputElement

  for (const button of btnControls) {
    const btnEl = button as HTMLButtonElement
    btnEl.classList.remove('active')
  }
  if (target.value.length === 0) {
    createErrorMessage(target, false)
    createErrorEl(target)
    resetInputValue(target)
    validateAndGetResult()
    renderDOMValues(tipAmountEl, totalAmountEl)
    return
  }

  const result = validateInput(target)

  if (typeof result === 'string') {
    createErrorMessage(target, !!result)
    createErrorEl(target, result)
    resetInputValue(target)
    validateAndGetResult()
    renderDOMValues(tipAmountEl, totalAmountEl)
    return
  }
  initialState.selectedTip = result / 100

  validateAndGetResult()
  renderDOMValues(tipAmountEl, totalAmountEl)
})

btnControls.forEach(btn => {
  btn.addEventListener('click', e => {
    const target = e.target as HTMLButtonElement
    createErrorEl(target, '', 'custom-error')

    initialState.selectedTip = Number(target.value) / 100

    for (const button of btnControls) {
      button.classList.remove('active')

      if (button.dataset.id === target.dataset.id) {
        target.classList.add('active')
      }
    }

    validateAndGetResult()
    renderDOMValues(tipAmountEl, totalAmountEl)
  })
})

btnReset.addEventListener('click', () => {
  initialState.bill = 0
  initialState.personCount = 0
  initialState.tipAmount = 0
  initialState.totalPerPerson = 0
  initialState.selectedTip = 0
  billInput.value = ''
  personInput.value = ''
  tipAmountEl.textContent = '$0.00'
  totalAmountEl.textContent = '$0.00'
  customInput.value = ''
  btnControls.forEach(btn => btn.classList.remove('active'))
})

calcEl.addEventListener('input', () => {
  validateAndGetResult()
  renderDOMValues(tipAmountEl, totalAmountEl)
})
