const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet(
            '1dxzgqVaDAmfLXi2da8NCeCE37oo3Rg05sA5bHSt3MrI'
        );
    }

    async load() {
        await this.doc.useServiceAccountAuth(require('./credentials.json'));
        await this.doc.loadInfo();
    }

    async addRows(rows) {
        const sheet = this.doc.sheetsByIndex[0];
        await sheet.addRows(rows);
    }

    async getRows() {
        const sheet = this.doc.sheetsByIndex[0];
        return await sheet.getRows();
    }

};
