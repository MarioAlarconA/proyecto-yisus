//movimiento de dinero, obtener transaccion y por usuario

import TransactionModel from "..-models/TransactionModel.js";

class ManagerTransaction{
    constructor(accountFromId, accountToId, type, amount, description){
        this.accountFromId = accountFromId;
        this.accountToId = accountToId,
        this.type = type,
        this.amount = amount,
        this.description = description;
    }

    async createTransaction(){
        try {
            const transaction = await TransactionModel.create({
                accountFromId: this.accountFromId,
                accountToId: this.accountToId,
                type: this.type,
                amount: this.amount,
                description: this.description
            })
            return transaction;
        } catch (error) {
            throw new Error(`Error al crear transaccion ${error}`);
        }
    }

    async getTransaction(id){
        try {
            const transaction = await TransactionModel.findById(id);
            return transaction;
        } catch (error) {
            throw new Error(`Error al obtener transaccion ${error}`);
        }
    }

    async getTransactions(){
        try {
            const transactions = await TransactionModel.find();
            return transactions;
        } catch (error) {
            throw new Error(`Error al obtener transacciones ${error}`);
        }
    }

    async getAccountTransactions(id){
        try {
            const transactions = await TransactionModel.find({accountFromIdid:id});
            return transactions;
        } catch (error) {
            throw new Error(`Error al obtener transacciones ${error}`);
        }
    }
}