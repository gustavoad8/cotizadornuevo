import React, { useState } from 'react';
import { Calculator, Save, Image } from 'lucide-react';

const Cotizador = () => {
  const [items, setItems] = useState([
    { descripcion: 'Mueble en Melamina HR15mm', cantidad: 1, precio: 4000000 }
  ]);
  const [envio, setEnvio] = useState(0);
  const [logo, setLogo] = useState(null);
  
  const addItem = () => {
    setItems([...items, { descripcion: '', cantidad: 1, precio: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
  const total = subtotal + envio;

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const savePDF = () => {
    // Aquí iría la lógica para guardar en PDF
    alert("Función para guardar en PDF. En un entorno real, esto generaría y descargaría un PDF.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          {logo ? (
            <img src={logo} alt="Logo de la empresa" className="w-16 h-16 mr-4 object-contain" />
          ) : (
            <div className="w-16 h-16 mr-4 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <label htmlFor="logo-upload" className="cursor-pointer">
                <Image className="text-gray-400" />
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">Nombre de la Empresa</h1>
            <p className="text-gray-600">NIT: 123456789-0</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold">Cotización</h2>
          <p className="text-gray-600">Fecha: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-600">No: 001</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Datos del Cliente</h3>
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Nombre del Cliente" />
          <input className="border p-2 rounded" placeholder="Email" />
          <input className="border p-2 rounded" placeholder="Teléfono" />
          <input className="border p-2 rounded" placeholder="Dirección" />
        </div>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Descripción</th>
            <th className="p-2 text-left">Cantidad</th>
            <th className="p-2 text-left">Precio Unitario</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td><input className="border p-2 w-full" value={item.descripcion} onChange={(e) => updateItem(index, 'descripcion', e.target.value)} /></td>
              <td><input className="border p-2 w-full" type="number" value={item.cantidad} onChange={(e) => updateItem(index, 'cantidad', parseInt(e.target.value))} /></td>
              <td><input className="border p-2 w-full" type="number" value={item.precio} onChange={(e) => updateItem(index, 'precio', parseInt(e.target.value))} /></td>
              <td className="p-2">${item.cantidad * item.precio}</td>
              <td><button className="text-red-500" onClick={() => removeItem(index)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-6" onClick={addItem}>Agregar Ítem</button>

      <div className="flex justify-end">
        <div className="w-1/2">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Envío:</span>
            <input className="border p-1 w-20 text-right" type="number" value={envio} onChange={(e) => setEnvio(parseInt(e.target.value))} />
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Observaciones</h3>
        <textarea className="border p-2 w-full h-24 rounded" placeholder="Ingrese las observaciones aquí"></textarea>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button className="bg-green-500 text-white px-6 py-2 rounded inline-flex items-center">
          <Calculator className="mr-2" />
          Generar Cotización
        </button>
        <button className="bg-blue-500 text-white px-6 py-2 rounded inline-flex items-center" onClick={savePDF}>
          <Save className="mr-2" />
          Guardar PDF
        </button>
      </div>
    </div>
  );
};

export default Cotizador;
