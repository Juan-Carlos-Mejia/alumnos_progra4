let db;

const abrirStore = (store, modo) => {
  const ltx = db.transaction(store, modo);
  return ltx.objectStore(store);
};

const abrirDB = () => {
  const indexDB = indexedDB.open('db_sistema', 1);

  indexDB.onupgradeneeded = e => {
    const req = e.target.result;
    try {
      const tblalumno = req.createObjectStore('alumnos', { keyPath: 'idalumno' });
      tblalumno.createIndex('idalumno', 'idalumno', { unique: true });
      tblalumno.createIndex('codigo', 'codigo', { unique: true });
    } catch (error) {
      console.error('Error al crear o actualizar la base de datos', error.message);
    }
  };

  indexDB.onsuccess = e => {
    db = e.target.result;
  };

  indexDB.onerror = e => {
    console.error('Error al abrir la base de datos', e.target.error.message);
  };
};

abrirDB();
