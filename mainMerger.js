const { builtinModules } = require('module');
const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

const combinePdfs = async (pdf1 , pdf2) => {
    await merger.add(pdf1);
    await merger.add(pdf2);

    let currTime = new Date();
    currTime = currTime.getTime();

    await merger.save(`./finalPdfs/combined-${currTime}.pdf`); //save under given name and reset the internal document
    return currTime;
};

module.exports = {combinePdfs};