import { wavRiffView } from './wavRiff.js';

const file = document.getElementById('file');
const result = document.getElementById('result');

if (window.File && window.FileReader && window.FileList && window.Blob) {
	function loadLocalBinary(event) {
	//	let blob = new Blob(event.target.files, { type: 'application/octet-stream' });
		let reader = new FileReader();

		reader.onload = function() {
			result.innerHTML = wavRiffView(new Uint8Array(reader.result));
		}

		reader.readAsArrayBuffer(event.target.files[0]);
	}

	file.addEventListener('change', loadLocalBinary, false);
} else {
	file.style.display = 'none';
	result.innerHTML = 'ブラウザが対応していません。';
}