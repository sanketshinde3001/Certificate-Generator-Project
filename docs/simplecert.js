const simplecert = (options, themeOptions) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <center>
        <style>
        .signature, .title { 
        float:left;
          border-top: 1px solid #000;
          width: 200px; 
          text-align: center;
        }
        </style>
        <div style="width:750px; height:560px; padding:20px; text-align:center; border: 10px solid #787878">
        <div style="width:700px; height:510px; padding:20px; text-align:center; border: 5px solid #787878">
               <span style="font-size:50px; font-weight:bold">Certificate of Completion</span>
               <br><br>
               <span style="font-size:25px"><i>This is to certify that</i></span>
               <br><br>
               <span style="font-size:30px"><b>${options.name}</b></span><br/><br/>
               <span style="font-size:25px"><i>has completed the course</i></span> <br/><br/>
               <span style="font-size:30px">${options.title}</span> <br/><br/>
               <span style="font-size:20px">with score of <b>${options.percentage}%</b></span> <br/><br/><br/><br/>
               <span style="font-size:25px"><i>Completed Date</i></span><br>
               <span style="font-size:25px"><i>${options.date}</i></span><br>
        <table style="margin-top:40px;float:left">
        <tr>
        <td><span><b>${options.person1}</b></td>
        </tr>
        <tr>
        <td style="width:200px;float:left;border:0;border-bottom:1px solid #000;"></td>
        </tr>
        <tr>
        <td style="text-align:center"><span><b>Signature</b></td>
        </tr>
        </table>
        <table style="margin-top:40px;float:right">
        <tr>
        <td><span><b>${options.person2}</b></td>
        </tr>
        <tr>
        <td style="width:200px;float:right;border:0;border-bottom:1px solid #000;"></td>
        </tr>
        <tr>
        <td style="text-align:center"><span><b>Signature</b></td>
        </tr>
        </table>
        </div>
        </div>
        </center>
         
        
</body>
</html>`;
};

module.exports = simplecert;
