class Calculator
{
    constructor(previousOperandTextElement,currentOperandTextElement)
    {
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand=''
        this.currentOperand=''
        this.operation=undefined
    }
    delete(){
        if(this.currentOperand!='')
        this.currentOperand=this.currentOperand.slice(0,-1)
    }
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        if(number==='.' && this.currentOperand==='') return
        this.currentOperand=this.currentOperand.toString()+number.toString()
    }
    chooseOperation(operation){
        //if(this.currentOperand==='') return
        if(this.previousOperand!='')
        {
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand.toString()+' '+ operation.toString()
        this.currentOperand='';
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(current)) return
        switch(this.operation)
        {
            case '+':
                computation=prev+current;
                break;
            case '-':
                computation=prev-current;
                break;
            case '*':
                computation=prev*current;
                break;
            case '/':
                computation=prev/current;
                break;
        }
        this.previousOperand=''
        this.currentOperand=computation

    }
    updateDisplay(){
        this.previousOperandTextElement.innerText = this.previousOperand 
        this.currentOperandTextElement.innerText = this.currentOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})

