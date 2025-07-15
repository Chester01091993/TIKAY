import React, { useState } from 'react';
import styles from './TableManagement.module.css';

const TableManagement = ({ 
  tables, 
  selectedDate, 
  selectedTime, 
  reservations, 
  onTableSelect, 
  selectedTable, 
  onTableUpdate 
}) => {
  const [isAddingTable, setIsAddingTable] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [newTableData, setNewTableData] = useState({
    name: '',
    capacity: 2,
    location: 'Interior',
    status: 'available'
  });

  // Verificar disponibilidad de mesa
  const isTableAvailable = (tableId) => {
    if (!selectedDate || !selectedTime) return true;
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    return !reservations.some(reservation => 
      reservation.tableId === tableId && 
      reservation.date === dateStr && 
      reservation.time === selectedTime
    );
  };

  // Obtener reservas para una mesa en la fecha y hora seleccionada
  const getTableReservations = (tableId) => {
    if (!selectedDate || !selectedTime) return [];
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    return reservations.filter(reservation => 
      reservation.tableId === tableId && 
      reservation.date === dateStr && 
      reservation.time === selectedTime
    );
  };

  // Obtener estadísticas de ocupación
  const getTableStats = (tableId) => {
    const tableReservations = reservations.filter(r => r.tableId === tableId);
    const today = new Date().toISOString().split('T')[0];
    const todayReservations = tableReservations.filter(r => r.date === today);
    
    return {
      totalReservations: tableReservations.length,
      todayReservations: todayReservations.length,
      averageGuests: tableReservations.length > 0 
        ? (tableReservations.reduce((sum, r) => sum + r.numberOfGuests, 0) / tableReservations.length).toFixed(1)
        : 0
    };
  };

  // Agregar nueva mesa
  const addTable = () => {
    if (!newTableData.name.trim()) {
      alert('El nombre de la mesa es obligatorio');
      return;
    }

    const newTable = {
      id: Date.now(),
      ...newTableData,
      createdAt: new Date().toISOString()
    };

    onTableUpdate([...tables, newTable]);
    setNewTableData({
      name: '',
      capacity: 2,
      location: 'Interior',
      status: 'available'
    });
    setIsAddingTable(false);
  };

  // Actualizar mesa existente
  const updateTable = () => {
    if (!editingTable || !editingTable.name.trim()) {
      alert('El nombre de la mesa es obligatorio');
      return;
    }

    const updatedTables = tables.map(table => 
      table.id === editingTable.id 
        ? { ...editingTable, updatedAt: new Date().toISOString() }
        : table
    );

    onTableUpdate(updatedTables);
    setEditingTable(null);
  };

  // Eliminar mesa
  const deleteTable = (tableId) => {
    const tableReservations = reservations.filter(r => r.tableId === tableId);
    
    if (tableReservations.length > 0) {
      if (!window.confirm(`Esta mesa tiene ${tableReservations.length} reserva(s). ¿Estás seguro de que quieres eliminarla?`)) {
        return;
      }
    }

    const updatedTables = tables.filter(table => table.id !== tableId);
    onTableUpdate(updatedTables);
    
    if (selectedTable === tableId) {
      onTableSelect(null);
    }
  };

  // Cambiar estado de mesa
  const changeTableStatus = (tableId, newStatus) => {
    const updatedTables = tables.map(table => 
      table.id === tableId 
        ? { ...table, status: newStatus, updatedAt: new Date().toISOString() }
        : table
    );
    onTableUpdate(updatedTables);
  };

  // Obtener color de estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'green';
      case 'occupied':
        return 'red';
      case 'reserved':
        return 'orange';
      case 'maintenance':
        return 'gray';
      default:
        return 'blue';
    }
  };

  // Obtener texto de estado
  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'occupied':
        return 'Ocupada';
      case 'reserved':
        return 'Reservada';
      case 'maintenance':
        return 'Mantenimiento';
      default:
        return status;
    }
  };

  // Obtener color de ubicación
  const getLocationColor = (location) => {
    switch (location) {
      case 'Interior':
        return '#3498db';
      case 'Terraza':
        return '#27ae60';
      case 'Privado':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className={styles.tableManagement}>
      <div className={styles.managementHeader}>
        <h3>Gestión de Mesas</h3>
        <button 
          onClick={() => setIsAddingTable(true)}
          className={styles.addTableButton}
        >
          <i className="fas fa-plus"></i>
          Agregar Mesa
        </button>
      </div>

      <div className={styles.tablesGrid}>
        {tables.map(table => {
          const isAvailable = isTableAvailable(table.id);
          const tableReservations = getTableReservations(table.id);
          const stats = getTableStats(table.id);
          const isSelected = selectedTable === table.id;

          return (
            <div 
              key={table.id} 
              className={`${styles.tableCard} ${isSelected ? styles.selected : ''} ${!isAvailable ? styles.unavailable : ''}`}
              onClick={() => onTableSelect(table.id)}
            >
              <div className={styles.tableHeader}>
                <h4 className={styles.tableName}>{table.name}</h4>
                <div className={styles.tableActions}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTable(table);
                    }}
                    className={styles.editTableButton}
                    title="Editar mesa"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTable(table.id);
                    }}
                    className={styles.deleteTableButton}
                    title="Eliminar mesa"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className={styles.tableInfo}>
                <div className={styles.tableCapacity}>
                  <i className="fas fa-users"></i>
                  <span>{table.capacity} personas</span>
                </div>
                
                <div className={styles.tableLocation}>
                  <span 
                    className={styles.locationBadge}
                    style={{ backgroundColor: getLocationColor(table.location) }}
                  >
                    {table.location}
                  </span>
                </div>

                <div className={styles.tableStatus}>
                  <span 
                    className={`${styles.statusBadge} ${styles[table.status]}`}
                    style={{ backgroundColor: getStatusColor(table.status) }}
                  >
                    {getStatusText(table.status)}
                  </span>
                </div>
              </div>

              {selectedDate && selectedTime && (
                <div className={styles.availabilityInfo}>
                  {isAvailable ? (
                    <div className={styles.available}>
                      <i className="fas fa-check-circle"></i>
                      <span>Disponible</span>
                    </div>
                  ) : (
                    <div className={styles.unavailable}>
                      <i className="fas fa-times-circle"></i>
                      <span>Ocupada</span>
                      {tableReservations.map(reservation => (
                        <div key={reservation.id} className={styles.conflictingReservation}>
                          {reservation.customerName} - {reservation.numberOfGuests} personas
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className={styles.tableStats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Total reservas:</span>
                  <span className={styles.statValue}>{stats.totalReservations}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Hoy:</span>
                  <span className={styles.statValue}>{stats.todayReservations}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Promedio personas:</span>
                  <span className={styles.statValue}>{stats.averageGuests}</span>
                </div>
              </div>

              <div className={styles.tableControls}>
                <select
                  value={table.status}
                  onChange={(e) => changeTableStatus(table.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className={styles.statusSelect}
                >
                  <option value="available">Disponible</option>
                  <option value="occupied">Ocupada</option>
                  <option value="reserved">Reservada</option>
                  <option value="maintenance">Mantenimiento</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para agregar mesa */}
      {isAddingTable && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Agregar Nueva Mesa</h3>
              <button onClick={() => setIsAddingTable(false)} className={styles.closeButton}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.formGroup}>
                <label>Nombre de la Mesa</label>
                <input
                  type="text"
                  value={newTableData.name}
                  onChange={(e) => setNewTableData({...newTableData, name: e.target.value})}
                  placeholder="Ej: Mesa 7, Mesa VIP, etc."
                />
              </div>
              <div className={styles.formGroup}>
                <label>Capacidad</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newTableData.capacity}
                  onChange={(e) => setNewTableData({...newTableData, capacity: parseInt(e.target.value)})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ubicación</label>
                <select
                  value={newTableData.location}
                  onChange={(e) => setNewTableData({...newTableData, location: e.target.value})}
                >
                  <option value="Interior">Interior</option>
                  <option value="Terraza">Terraza</option>
                  <option value="Privado">Privado</option>
                </select>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setIsAddingTable(false)} className={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={addTable} className={styles.confirmButton}>
                Agregar Mesa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar mesa */}
      {editingTable && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Editar Mesa</h3>
              <button onClick={() => setEditingTable(null)} className={styles.closeButton}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.formGroup}>
                <label>Nombre de la Mesa</label>
                <input
                  type="text"
                  value={editingTable.name}
                  onChange={(e) => setEditingTable({...editingTable, name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Capacidad</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={editingTable.capacity}
                  onChange={(e) => setEditingTable({...editingTable, capacity: parseInt(e.target.value)})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ubicación</label>
                <select
                  value={editingTable.location}
                  onChange={(e) => setEditingTable({...editingTable, location: e.target.value})}
                >
                  <option value="Interior">Interior</option>
                  <option value="Terraza">Terraza</option>
                  <option value="Privado">Privado</option>
                </select>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setEditingTable(null)} className={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={updateTable} className={styles.confirmButton}>
                Actualizar Mesa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableManagement; 