module.exports = {
    modifyTableData(data) {
        let usersTable = []
        for (let row of data) {
            if (Boolean(row.trim())) {
                usersTable.push(row.split('\n').sort())
            }
        }
        return usersTable;
    }
}