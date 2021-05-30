import { Binary } from './Binary.js';

export function readWavFormat(source) {
	const binary = new Binary(source);

	let table = [];
	const addToTable = (text, val) => {
		if (val === false) {
			table.push('読み取れないままファイルの終点に到達しました');
			return false;
		}

		table.push([text, val]);
		return true;
	}

	if (binary.getWord(4) !== 'RIFF') {
		table.push('RIFFがありません');
		return table;
	}

	if (addToTable('RIFF size', binary.getNum(4)) === false) return table;

	if (binary.getWord(4) !== 'WAVE') {
		table.push('WAVEがありません');
		return table;
	}

	if (binary.findWord('fmt ') === false) {
		table.push('fmt がありません');
		return table;
	}

	const formatSize = binary.getNum(4);
	if (formatSize === false) {
		table.push('読み取れないままファイルの終点に到達しました');
		return table;
	}
	table.push(['format size', formatSize]);
	
	if (addToTable('format tag', binary.getNum(2)) === false) return table;
	if (addToTable('format channel', binary.getNum(2)) === false) return table;
	if (addToTable('samples par sec', binary.getNum(4)) === false) return table;
	if (addToTable('avg par sec', binary.getNum(4)) === false) return table;
	if (addToTable('block align', binary.getNum(2)) === false) return table;
	if (addToTable('bit par sample', binary.getNum(2)) === false) return table;

	if (formatSize > 16) {
		const exSize = binary.getNum(2);
		if (exSize === false) {
			table.push('読み取れないままファイルの終点に到達しました');
			return table;
		}
		table.push(['ex size', exSize]);

		if (addToTable('ex', binary.getNum(exSize)) === false) return table;
	}

	if (binary.findWord('data') === false) {
		table.push('dataがありません');
		return table;
	}

	if (addToTable('data size', binary.getNum(4)) === false) return table;

	console.log('read complete')
	return table;
}