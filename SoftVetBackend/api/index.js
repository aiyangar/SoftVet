const server = require('./src/app');
const { conn } = require('./src/database');

const PORT = 3001;

server.listen(PORT, () => {
    // Sincronizar base de datos cuando force es true
    // Esto eliminará y recreará las tablas en la base de datos
    // Si force es false, no se eliminarán las tablas existentes
    conn.sync({ force: true })
        .then(() => console.log('Database is connected'))
        .catch(err => console.error('Unable to connect to the database:', err));
    console.log(`Server is running on http://localhost:${PORT}`);
})