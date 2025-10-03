document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#validacion");
  
  if (form) {
    const nombre = document.querySelector("input[name='nombre']");
    const correo = document.querySelector("input[name='correo']");

    form.addEventListener("submit", function (e) {
      let errores = [];

      // Validar nombre
      if (!nombre.value.trim()) {
        errores.push("Por favor ingresa tu nombre.");
      }

      // Validar correo
      if (!correo.value.trim()) {
        errores.push("Por favor ingresa tu correo.");
      } else if (!validarCorreo(correo.value)) {
        errores.push("El formato del correo no es válido.");
      }

      // Mostrar errores y prevenir envío
      if (errores.length > 0) {
        e.preventDefault();
        alert(errores.join("\n"));
      }
    });

    function validarCorreo(email) {
      // Expresión regular básica para validar correo
      const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      return regex.test(email);
    }
  }
});
