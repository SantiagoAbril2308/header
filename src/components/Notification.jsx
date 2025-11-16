// src\components\Notification.jsx

const ToastNotification = ({ toast }) => {
  // 💡 Solución: Si 'toast' es undefined o null, no se renderiza nada.
  // Esto evita el error de intentar leer 'type' de un objeto no existente.
  if (!toast) {
    return null; 
  }

  let colorClasses = '';
  
  if (toast.type === 'success') {
    colorClasses = 'bg-green-600 text-white';
  } else if (toast.type === 'info') {
    colorClasses = 'bg-blue-600 text-white';
  } else if (toast.type === 'error') { // Asumo que también manejarás errores
    colorClasses = 'bg-red-600 text-white';
  } else if (toast.type === 'warning') {
    colorClasses = 'bg-yellow-500 text-black';
  }

  // El resto de tu lógica de renderizado del Toast va aquí
  // Por ejemplo:
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-xl ${colorClasses}`}>
      <p>{toast.message}</p>
    </div>
  );
};

export default ToastNotification;