import sql from 'mssql';

export class EmployeeReader {

    config: sql.config = {
        user: 'admin',
        password: 'admin',
        server: "DESKTOP\\MSSQLHOME",
        database: 'scheduler',
        options: {
            encrypt: false,
            enableArithAbort: true,
            trustServerCertificate: true
        }
    }

    async getConnection(): Promise<sql.ConnectionPool | null> {
        try {
            const pool = await sql.connect(this.config);
            return pool;
        } catch (error) {
            console.error(error);
            return null;

        }
    }

}