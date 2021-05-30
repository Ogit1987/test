export class Binary {
	constructor(source) {
		this.binary = new Uint8Array(source);
		this.seek = 0;
	}

	length() { return this.binary.length; }
	current() { return this.seek; }

	isRange(seek) { return seek >= 0 && seek <= this.binary.length; }

	setSeekBegin() { this.seek = 0; }
	setSeekEnd() { this.seek = this.binary.length; }

	setSeek(seek) {
		if (seek < 0)
			return false;
		
		this.seek = seek;
		return true;
	}

	moveSeek(diff) {
		if (this.seek + diff < 0)
			return false;

		this.seek += diff;

		if (this.seek >= this.binary.length)
			this.setSeekEnd();

		return true;
	}
 
	peekNum(length) {
		if (!this.isRange(this.seek + length))
			return false;

		const slicedBinary = this.binary.slice(this.seek, this.seek + length);

		let num = 0;
		for (let i = 0; i < length; ++i)
			num += slicedBinary[i] << 8 * i;

		return num;
	}

	getNum(length) {
		const num = this.peekNum(length);

		if (num !== false)
			this.moveSeek(length);

		return num;
	}

	peekWord(length) {
		if (!this.isRange(this.seek + length))
			return false;

		const word = String.fromCharCode.apply(null, (this.binary.slice(this.seek, this.seek + length)));
	
		return word;
	}

	getWord(length) {
		const word = this.peekWord(length);

		if (word !== false)
			this.moveSeek(length);
		
		return word;
    }

	findNum(nums, seek = this.seek) {
		if (Array.isArray(nums) === false)
			nums = [nums];

		const length = nums.length;

		if (seek < 0 || !this.isRange(seek + length))
			return false;

		let isCompare = new Array(length - 1).fill(false);
		const exCompareCount = isCompare.length;

		while (seek < this.binary.length) {
			for (let i = exCompareCount - 1; i >= 0; --i) {
				if (isCompare[i]) {
					if (this.binary[seek] === nums[i + 1]) {
						if (i === exCompareCount - 1) {
							this.setSeek(seek + 1);
							return true;
						}

						isCompare[i + 1] = true;
					}

					isCompare[i] = false;
				}
			}

			if (this.binary[seek] === nums[0]) {
				if (exCompareCount > 0) {
					isCompare[0] = true;
				} else {
					this.setSeek(seek + 1);
					return true;
				}
			}

			++seek;
		}

		return false;
	}

	findWord(word, seek = this.seek) {
		let nums = [];
		for (let i = 0, length = word.length; i < length; ++i)
			nums.push(word.charCodeAt(i));

		return this.findNum(nums, seek);
	}
}