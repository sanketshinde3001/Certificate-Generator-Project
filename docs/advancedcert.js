const advancedcert = (options, themeOptions) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<style>
* {
  box-sizing: border-box;
}

.btn{
  padding: 10px 17px; 
  border-radius: 3px; 
  background: #f4b71a; 
  border: none; 
  font-size: 12px; 
  margin: 10px 5px;
}

.toolbar{
  background: #333; 
  width: 100vw; 
  position: fixed; 
  left: 0; 
  top: 0; 
  text-align: center;
}

.cert-container {
  margin:0 0 0 0; 
  width: 100%; 
  display: flex; 
  justify-content: center;
}

.cert {
  width:800px; 
  height:620px; 
  padding:15px 20px; 
  text-align:center; 
  position: relative; 
  z-index: -1;
}

.cert-bg {
  position: absolute; 
  left: 0px; 
  top: 0; 
  z-index: -1;

}

.cert-content {
  width:750px; 
  height:470px; 
  padding:70px 60px 0px 60px; 
  text-align:center;
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  font-size:44px;
}

p {
  font-size:25px;
}

small {
  font-size: 14px;
  line-height: 12px;
}


.other-font { 
  font-family: Cambria, Georgia, serif;
  font-style: italic;
}

</style>
<body>
    
<div class="cert-container print-m-0">
  <div id="content2" class="cert">
    <img
      src="https://raw.githubusercontent.com/sanketshinde3001/How-to-/main/dump/certificate.png"
      class="cert-bg"
      alt=""
    />
    <div class="cert-content">
        <h1 class="other-font">Certificate of Completion</h1>
        <br />
        <span style="font-size: 30px ; font-family:'Times New Roman', Times, serif">${options.name}</span>
    <br /><br />
        <span class="other-font"><i style="font-size: 20px;">has completed the</i></span>
    <br /><br /><br />
        <span style="font-size: 30px;"><b>${options.title}</b></span>
    <br /><br />
    <span style="font-size: 17px; font-family:'Times New Roman', Times, serif"">${options.description}</span>
    <br/><br/><br/><br/>
    <span>Completed on: ${options.date}</span>
  </div>
</div>
</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js"></script>
</html>

    `;
};

module.exports = advancedcert;
