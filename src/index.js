var Calculator = /** @class */ (function () {
    function Calculator() {
        this.buttonList = [
            ['Clear', '÷'],
            ['7', '8', '9', '×'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['0', '.', '=']
        ];
        this.computeString = '';
        this.endCompute = 0;
        this.container = document.createElement('div');
        this.creatElement(this.container, document.body, 'shell');
        this.creatElement('div', this.container, 'output', '0');
        this.creatElementButton();
        this.bindEvent();
    }
    Calculator.prototype.creatElement = function (tagName, container, className, text) {
        var tag;
        if (typeof tagName === 'string') {
            tag = document.createElement(tagName);
        }
        else {
            tag = tagName;
        }
        className && (tag.className = className);
        if (text) {
            var span = document.createElement('span');
            span.textContent = text;
            tag.appendChild(span);
        }
        container.appendChild(tag);
    };
    Calculator.prototype.creatElementButton = function () {
        var _this = this;
        this.buttonList.forEach(function (item) {
            var div = document.createElement('div');
            item.forEach(function (text) {
                _this.creatElement('button', div, "button-" + text, text);
            });
            _this.creatElement(div, _this.container, 'button');
        });
    };
    Calculator.prototype.bindEvent = function () {
        var _this = this;
        this.container.addEventListener('click', function (e) {
            if (e.target instanceof HTMLElement) {
                var numberString = '0123456789.';
                var mark = '+-×÷';
                var text = e.target.textContent;
                if (numberString.includes(text)) {
                    _this.computeString += text;
                }
                else if (mark.includes(text)) {
                    if (text === '×') {
                        text = '*';
                    }
                    else if (text === '÷') {
                        text = '/';
                    }
                    _this.computeString += text;
                }
                else if (text === '=') {
                    _this.endCompute = eval(_this.computeString);
                    var pointNum = _this.endCompute.toString().split('.');
                    if (pointNum[1] && pointNum[1].length > 6) {
                        _this.endCompute = parseFloat(_this.endCompute.toFixed(7));
                    }
                    _this.computeString = _this.endCompute + '';
                    _this.setOutput();
                }
                else if (text === 'Clear') {
                    _this.endCompute = 0;
                    _this.computeString = '';
                    _this.setOutput();
                }
            }
        });
    };
    Calculator.prototype.setOutput = function () {
        var span = document.querySelector('.shell .output span');
        span.textContent = this.endCompute + '';
    };
    return Calculator;
}());
new Calculator();
