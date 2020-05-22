class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currOperandTextElement = currOperandTextElement
        this.clear()
    }

    clear() {
        this.prevOperand = ''
        this.currOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.'))
            return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    selectOperation(operation) {
        if (this.currOperand === '')
            return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    compute() {
        let result
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(curr)) 
            return
        switch (this.operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '÷':
                result = prev / curr
                break
            default:
                return
        }
        this.currOperand = result
        this.operation = undefined
        this.prevOperand = ''
    }

    updateDisplay() {
        this.currOperandTextElement.innerText = this.currOperand
        if (this.operation != undefined) {
            this.prevOperandTextElement.innerText = `${this.prevOperand} ${this.operation}`    
        } else {
            this.prevOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const prevOperandTextElement = document.querySelector('[data-previous-operand]')
const currOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})