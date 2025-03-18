import fs from "fs";

const readFile = (pathFile) => {
  try {
    const data = fs.readFileSync(pathFile, "utf-8");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

const writeFile = (pathFile) => {
  try {
    fs.writeFileSync(pathFile, "Nuevo Contenido!");
    console.log("Texto agregado correctamente");
  } catch (error) {
    console.error(error);
  }
}

const appendFile = (pathFile) => {
  try {
    fs.appendFileSync(pathFile, "\nNueva Linea");
    console.log("Texto nuevo agregado correctamente!");
  } catch (error) {
    console.error(error);
  }
}

const existsFile = (pathFile) => {
  if(fs.existsSync(pathFile)){
    console.log("El archivo existe");
  }else{
    console.log("El archivo NO existe");
  }
}

//readFile("./texto.txt");
//writeFile("./texto.txt");
//appendFile("./texto.txt");
existsFile("./texto.txt");
