class Calculator {
    public buttonList:Array<Array<string>> = [
        ['Clear', '÷'],
        ['7','8','9','×'],
        ['4','5','6','-'],
        ['1','2','3','+'],
        ['0','.','=']
    ];
    private container: HTMLDivElement;
    private computeString:string = '';
    private endCompute: number = 0;
    constructor() {
        this.container = document.createElement('div')
        this.creatElement(this.container,document.body,'shell')
        this.creatElement('div',this.container,'output','0')
        this.creatElementButton()
        this.bindEvent()
    }
    creatElement(tagName:string | HTMLElement,container:HTMLElement,className?:string,text?:string) {
        let tag: HTMLElement = typeof tagName === 'string' ? document.createElement(tagName) : tagName
        className && (tag.className = className)
        if (text) {
            let span = document.createElement('span')
            span.textContent = text
            tag.appendChild(span)
        }
        container.appendChild(tag)
    }
    creatElementButton() {
        this.buttonList.forEach((item)=>{
            let div:HTMLDivElement = document.createElement('div')
            item.forEach((text)=>{
                this.creatElement('button',div,`button-${text}`,text)
            })
            this.creatElement(div,this.container,'button')
        })
    }
    bindEvent() {
        this.container.addEventListener('click', (e)=>{
            if (e.target instanceof HTMLElement) {
                let numberString = '0123456789.'
                let mark = '+-×÷'
                let text = e.target.textContent
                if (numberString.includes(text)) {
                    this.computeString += text
                } else if (mark.includes(text)) {
                    if (text === '×') {
                        text = '*'
                    } else if (text === '÷') {
                        text = '/'
                    }
                    if (this.computeString) {
                        console.log('computeString', this.computeString)
                        this.endCompute = eval(this.computeString)
                        this.setEnd()
                    }
                    this.computeString += text
                } else if (text === '='){
                    try {
                        this.endCompute = eval(this.computeString)
                    } catch (err) {
                        this.endCompute = 0
                        this.computeString = ''
                    }
                    this.setEnd()
                } else if (text === 'Clear') {
                    this.endCompute = 0
                    this.computeString = ''
                    this.setOutput()
                }
            }
        })
    }
    setOutput() {
        let span = document.querySelector('.shell .output span')
        span.textContent = this.endCompute + ''
    }
    setEnd() {
        let pointNum = this.endCompute.toString().split('.')
        if (pointNum[1] && pointNum[1].length>6) {
            this.endCompute = parseFloat(this.endCompute.toFixed(7))
        }
        this.computeString = this.endCompute + ''
        this.setOutput()
    }
}
new Calculator()