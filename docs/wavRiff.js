function littleEndian(binary) {
	let result = 0;
	for (let i = 0; i < binary.length; ++i) {
		result += binary[i] << 8 * i;
	}

	return result;
}

export function wavRiffView(binary) {
	let list = '';
	let cur = 0;

	if (String.fromCharCode.apply(null, (binary.slice(cur, cur + 4))) != 'RIFF') {
		result.innerHTML = 'RIFFが見つかりませんでした';
		return;
	}
	cur += 4;

	list += 'RIFF size : ' + littleEndian(binary.slice(cur, cur + 4)) + '\n';
	cur += 4;

	if (String.fromCharCode.apply(null, (binary.slice(cur, cur + 4))) != 'WAVE') {
		result.innerHTML = 'WAVEが見つかりませんでした';
		return;
	}
	cur += 4;

	while (String.fromCharCode.apply(null, (binary.slice(cur, cur + 4))) != 'fmt ')
		cur += 2;

	cur += 4;

	let formatSize = littleEndian(binary.slice(cur, cur + 4));
	cur += 4;
	list += 'format size : ' + formatSize + '\n';

	list += 'format tag : ' + littleEndian(binary.slice(cur, cur + 2)) + '\n';
	cur += 2;

	list += 'format channel : ' + littleEndian(binary.slice(cur, cur + 2)) + '\n';
	cur += 2;

	list += 'samples par sec : ' + littleEndian(binary.slice(cur, cur + 4)) + '\n';
	cur += 4;

	list += 'avg par sec : ' + littleEndian(binary.slice(cur, cur + 4)) + '\n';
	cur += 4;

	list += 'block align : ' + littleEndian(binary.slice(cur, cur + 2)) + '\n';
	cur += 2;

	list += 'bit par sample : ' + littleEndian(binary.slice(cur, cur + 2)) + '\n';
	cur += 2;

	if (formatSize > 16) {
		let exSize = littleEndian(binary.slice(cur, cur + 2));
		list += 'ex size : ' + exSize + '\n';
		cur += 2;

		list += 'ex : ' + littleEndian(binary.slice(cur, cur + exSize)) + '\n';
		cur += exSize;
	}

	while (String.fromCharCode.apply(null, (binary.slice(cur, cur + 4))) != 'data')
		cur += 2;

	cur += 4;

	list += 'data size : ' + littleEndian(binary.slice(cur, cur + 4)) + '\n';
	cur += 4;

//			for (let cur = 0; cur < 10; ++cur) {
//				list += binary[cur].toString(16).padStart(2, '0') + '\n';
//			}

	return list;
}