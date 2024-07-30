//registrar el usuario, iniciar y cerrar sesion, 
//obtener info. de usuario, crear transsaccion, borrar cuenta, actualizar

import UserModel from "../models/UserModel.js";
import ManagerAccount from "./AccountClass.js";
import ManagerCard from "./CardClass.js";

class ManagerUser{
    constructor(name, phone, email, lastName, isInSession, isAdmin, password){
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.lastName = lastName;
        this.isInSession = isInSession;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    async register(){
        try {
            const user = await UserModel.create({
                email: this.email,
                phone: this.phone,
                name: this.name,
                lastName: this.lastName,
                isInSession: this.isInSession,
                isAdmin: this.isAdmin,
                password: this.password
            });
            const MA = new ManagerAccount(user._id, 12345, "Ahorro", 10000);
            const currentAccount = await MA.createAccount();
            const MC = new ManagerCard(user._id, currentAccount._id, "16 num", "debito", "de la fecha actual sumar 3 años", "generar codigo de 3 cifras", "active");
            await MC.createCard();
            return user;


        } catch (error) {
            throw new Error(`Error al crear usuario: ${error}`);
        }
        
        
    }

    async Login(email, password){
        try {
            const user = await UserModel.findOne({email: email});
            if(!user){
                throw new Error("Usuario no registrado")
            }
            if(user.password !== password){
                throw new Error("Contraseña incorrecta")
            }
            return "Succeeded";

        } catch (error) {
            throw new Error(`Error al iniciar sesión: ${error}`);
        }
    }

    async getUserInfo(id){
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw new Error(`Error al obtener info. del usuario: ${error}`);
        }
    }

    async updateEmail(email){
        try {
            if (!email){
                throw new Error("Correo invalido")
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{email: email}
            });
            return "ok";
        } catch (error) {
            throw new Error("Error al actualizar correo")
        }
    }

    async updatePhone(phone){
        try {
            if (!phone){
                throw new Error("Numero invalido")
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{phone}
            });
            return "ok";
        } catch (error) {
            throw new Error("Error al actualizar numero")
        }
    }

    async updatePassword(password){
        try {
            if (!password){
                throw new Error("Contraseña invalido")
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{password}
            });
            return "ok";
        } catch (error) {
            throw new Error("Error al actualizar contraseña")
        }
    }

    //pendiente eliminar
}


export default ManagerUser;