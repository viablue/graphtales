


// button(onClick="

//drawGraph( dm_parse(document.querySelectorAll('textarea')[0].value) );

// ") graph it


// get html elements
const taleInput = document.getElementById('tale_input')
const taleParse = document.getElementById('tale_parse')
const taleOutput = document.getElementById('tale_output')
const taleDownload = document.getElementById('tale_download')
const taleTitle = document.getElementById('tale_title')

taleParse.addEventListener('click', doParse, false)
taleDownload.addEventListener('click', doSave, false)


function doParse () {
  let parse = dmParse(taleInput.value),
    output = JSON.stringify(parse, null, 4);

  taleOutput.value = output;
  drawGraph(parse);

  // console.log(parse)
}



function saveText (filename, data) {
	let blob = new Blob([data], {type: 'text/plain'});
	let elem = window.document.createElement('a');
	elem.href = window.URL.createObjectURL(blob);
	elem.download = filename;
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
	window.URL.revokeObjectURL(blob);
}


function doSave() { 
  let now = new Date().getTime();
  let fallback = "graphstory" + "-" + now;
	let title = taleTitle.value || fallback;
	let text = taleOutput.value;

	saveText(title+".txt", text)
}
