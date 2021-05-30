export class DisplayResult {
	constructor(display, itemClass, cellClass, cautionClass) {
		this.display = display;
		this.itemClass = itemClass;
		this.cellClass = cellClass;
		this.cautionClass = cautionClass;
	}
	
	setDisplay(display) { this.display = display; }
	setItemClass(itemClass) { this.itemClass = itemClass; }
	setCellClass(cellClass) { this.cellClass = cellClass; }
	setCautionClass(cautionClass) { this.cautionClass = cautionClass;}

	show(result) {
		this.display.textContent = '';
	
		let html = [];
		let skipCount = 0;
		for (let i = 0, itemLength = result.length; i < itemLength; ++i) {
			if (Array.isArray(result[i]) === true) {
				html.push(`<div class="${this.itemClass}">`);

				for (let j = 0, cellLength = result[i].length; j < cellLength; ++j)
					html.push(`<div class="${this.cellClass[(i + skipCount) % this.cellClass.length]}">${result[i][j]}</div>`)
			} else {
				html.push(`<div class="${this.cautionClass}">${result[i]}`);
				skipCount = (skipCount + 1) % this.cellClass.length;
			}

			html.push('</div>')
		}
		
		this.display.insertAdjacentHTML('beforeend', html.join(''));
	}
}