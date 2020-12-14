const path = require('path')
const fs = require('fs');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
import Videogame from '../models/Videogame';
global.__basedir = path.join(__dirname, '../');;

// Configurando la carpeta para uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

export const upload = multer({ storage: storage });

// Ingresar info del Excel a la base de datos de MongoDB
export const importExcelData2MongoDB = (req, res) => {
    const filePath = __basedir + '/public/uploads/' + req.file.filename;
    console.log(filePath);
    // Leer Excel y transformarlo a Json
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [{
            // Identificar el nombre de la Hoja en el Excel
            name: 'Videogame',

            // Header Row -> no se verá en el Json final
            header: {
                rows: 1
            },

            // Identificar las columnas del Excel que se leerán
            columnToKey: {
                A: 'title',
                B: 'description',
                C: 'saga',
                D: 'image'
            }
        }]
    });

    Videogame.insertMany(excelData.Videogame)
        .then(function() {
            console.log("Inserción correcta") // Success 
        }).catch(function(error) {
            console.log(error) // Failure 
        });

    // Se elimina el archivo subido a uploads
    fs.unlinkSync(filePath);

    res.json({
        'msg': 'File uploaded/import successfully!',
        'file': req.file
    });
}