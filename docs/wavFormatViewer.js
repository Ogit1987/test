import { DisplayResult } from './DisplayResult.js';
import { readWavFormat } from './readWavFormat.js';

const file = document.getElementById('file');
const display = document.getElementById('result');

if (window.File && window.FileReader) {
	file.addEventListener('change',
		(e) => {
			const reader = new FileReader();
	
			reader.onload = (e) => {
				const displayResult = new DisplayResult(display, 'item', ['cell inOddItem-color', 'cell inEvenItem-color'], 'caution');
				displayResult.show(readWavFormat(e.currentTarget.result));
			}

			reader.onerror = () => display.textContent = 'ファイル読み込みに何らかのエラーが発生しました。';

			reader.readAsArrayBuffer(e.currentTarget.files[0]);
		}
		);
} else {
	file.style.display = 'none';
	display.textContent = 'ブラウザが対応していません。';
}