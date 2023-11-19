//const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');

const { viewportHeight, viewportWidth, options, pages } = config;



function getNamesOfFiles(){
	var arr = new Array;
	fs.readdir(`./${process.argv[2]}/` , (err, files) => { 
		if (err) 
			console.log(err); 
			else { 
			console.log("\nCurrent directory filenames:"); 
				files.forEach(file => { 
				arr.push(file)
				//console.log(file); 
			}) 
		} 	console.log("El listado final es " + arr)
			return arr		
	}) 	
}
	
	

async function executeTest(){
	
	var arr2 = getNamesOfFiles();
	console.log("El vaor de arr2 es " + arr2)
   
    let resultInfo = {}	
	
	
	
    let datetime = new Date().toISOString().replace(/:/g,".");
	for(b of pages){
        if(!b in ['1.Pantalla inicial de pages','2.Pantalla campos de new page','3.Pantalla publicacion page','4.Pantalla continuacion page','5.Pantalla validacion page','6.Pantalla validacion creacion de page']){
            return;
        }	
		
		
	if (!fs.existsSync(`./results/Reporte_Create_Page`)){
            fs.mkdirSync(`./results/Reporte_Create_Page`, { recursive: true });
        }
		
		let image1 = fs.readFileSync(`./${process.argv[2]}/${b}.png`)		
		let image2 = fs.readFileSync(`./${process.argv[3]}/${b}.png`)
		
        const data = await compareImages(image1, image2, options);
        resultInfo[b] = {
            isSameDimensions: data.isSameDimensions,
            dimensionDifference: data.dimensionDifference,
            rawMisMatchPercentage: data.rawMisMatchPercentage,
            misMatchPercentage: data.misMatchPercentage,
            diffBounds: data.diffBounds,
            analysisTime: data.analysisTime
        }
        fs.writeFileSync(`./results/Reporte_Create_Page/compare-images-${b}.png`, data.getBuffer());
		fs.writeFileSync(`./results/Reporte_Create_Page/before-${b}.png`, image1);
		fs.writeFileSync(`./results/Reporte_Create_Page/after-${b}.png`, image2);
		
	}

	
	fs.writeFileSync(`./results/Reporte_Create_Page/report.html`, createReport(datetime, resultInfo));
	fs.copyFileSync('./index.css', `./results/Reporte_Create_Page/index.css`);

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;  
  }
(async ()=>console.log(await executeTest()))();


function browser(b, info){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Pantalla : ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="./before-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="./after-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-images-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 Create a New Page in Ghost</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
               ${config.pages.map(b=>browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}