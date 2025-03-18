import crypto from "crypto";
import fs from "fs";

const secretKey = "miclavesecreta";

class UsersManager{
  static users = [];
  static pathFile = "./users.json";

  static initialize = async() => {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
      this.users = JSON.parse(fileData);
      console.log("Datos cargados correctamente!");
    } catch (error) {
      console.error(error);
    }
  }

  static hashPassword = (password) => {
    const hashedPassword = crypto.createHmac("sha256", secretKey).update(password).digest("hex");
    return hashedPassword;
  }

  static createUser = (user) => {
    const hashedPassword = this.hashPassword(user.password);
    const newUser = { ...user, password: hashedPassword };

    //persistencia en memoria
    this.users.push(newUser);

    //persistencia en archivo
    this.saveUsers();
    console.log("Usuario creado correctamente!");
  }

  static saveUsers = async() => {
    try {
      await fs.promises.writeFile(this.pathFile, JSON.stringify(this.users, null, 2), "utf-8" );
    } catch (error) {
      console.error(error);
    }
  }

  static showUsers = () => {
    console.table(this.users);
  }

  static validateUser = (username, password) => {
    const userFind = this.users.find( (user) => user.username ===  username);
    if(!userFind) return "Usuario no encontrado";

    const hashedPassword = this.hashPassword(password);
    if(userFind.password === hashedPassword){
      return "Logueado correctamente";
    }else{
      return "Error, contraseña incorrecta";
    }
  }
}

const main = async() => {
  await UsersManager.initialize();
  /*
  UsersManager.createUser({
    fullname: "Maia Fazzini",
    username: "Maia01",
    password: "micontraseña"
  });
  
  UsersManager.createUser({
    fullname: "Melisa Lettiere",
    username: "Melisa01",
    password: "micontra"
  });
  */
  UsersManager.showUsers();
  console.log( UsersManager.validateUser("Maia01", "micontraseña") );
}

main();