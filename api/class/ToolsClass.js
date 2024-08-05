class Tools {
    static createNumberAccount(length) {
        let numberAccount = '';
        for (let i = 0; i < length; i++) {
            numberAccount += Math.floor(Math.random() * 10).toString();
        }
        return numberAccount;
    }

    static addYears(date) {
        const newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + 3);
        return newDate;
    }

    static createCode() {
        return Math.floor(Math.random() * 900) + 100;
    }

    static createInfoCard() {
        const actualDate = new Date();
        const newDate = this.addYears(actualDate);
        const numberAccount = this.createNumberAccount(16);
        const code = this.createCode(3);

        return {
            numberAccount: numberAccount,
            dueDate: newDate.toLocaleDateString(),
            code: code
        };
    }
}
