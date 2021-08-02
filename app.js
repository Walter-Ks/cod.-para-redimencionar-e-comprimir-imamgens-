/*
chama-se primeiramente os pacotes a serem usados.
npm install sharp : pacote que faz o redimencionamento da imagem;
npm install compress-images: pacote que comprime a imagem diminuido o tamanho dela;
fs : pacote nativo do node; 
*/
const sharp = require('sharp');
const compress_images = require('compress-images');
const fs = require('fs');

//---------------------------------

//variáveis que pegam os arquivos 
let path = process.argv[2];
let width = Number(process.argv[3]);

//----------------------------------

//função que redimenciona a imagem 
function resize( inputpath, outputPath, width) {
    
    sharp(inputpath).resize({width : width}).toFile(outputPath, (erro) =>{
        if(erro){
            console.log(erro)
        }else{
            console.log("deu certo");
            compress(outputPath, "./compressed/");
        }
    })
}

//-----------------------------------



//função que comprime a imagem;
function compress(pathInput, outputPath) {

        //código pego na documentação do "compress-images"
        compress_images(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
            { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
            { svg: { engine: "svgo", command: "--multipass" } },
            { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
                function (error, completed, statistic) {
                console.log("-------------");
                console.log(error);
                console.log(completed);
                console.log(statistic);
                console.log("-------------");

        //----------------------------------

                //código que apaga a imagem referência para comprimir após redimencionar
                fs.unlink(pathInput, (erro) => {
                    if (erro) {
                        console.log(erro)
                    } else{
                        console.log(pathInput, "apagado")
                    }
                })
                //-----------------------------

                }
        );

}



resize(path, './temp/output_resize.jpg', width)






