document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("validacion");
  const campos = ["nombre", "interes", "precio", "comentario"];
    const correo = document.getElementById("correo");
  const tooltip = document.getElementById("correo-tooltip");

  campos.forEach((campo) => {
    const input = document.getElementById(campo);
    input.addEventListener("input", () => validarCampo(input));
  });

  form.addEventListener("submit", function (e) {
    let valido = true;
    campos.forEach((campo) => {
      const input = document.getElementById(campo);
      if (!validarCampo(input)) {
        valido = false;
      }
    });

    if (!valido) {
      e.preventDefault();
    }
  });

  function validarCampo(input) {
    const valor = input.value.trim();
    const errorMsg = input.nextElementSibling;
    let valido = true;

    if (input.id === "nombre" && valor === "") {
      mostrarError(input, "El nombre es obligatorio.");
      valido = false;
    } else if (input.id === "interes" && valor === "") {
      mostrarError(input, "Selecciona una opción.");
      valido = false;
    } else if (input.id === "precio" && (valor === "" || isNaN(valor) || valor <= 0)) {
      mostrarError(input, "Ingresa un precio válido.");
      valido = false;
    } else if (input.id === "comentario" && valor.length < 10) {
      mostrarError(input, "El comentario debe tener al menos 10 caracteres.");
      valido = false;
    } else {
      limpiarError(input);
    }

    return valido;
  }

  function mostrarError(input, mensaje) {
    input.classList.add("error");
    let errorMsg = input.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains("error-message")) {
      errorMsg = document.createElement("div");
      errorMsg.classList.add("error-message");
      input.parentNode.insertBefore(errorMsg, input.nextSibling);
    }
    errorMsg.textContent = mensaje;
  }

  function limpiarError(input) {
    input.classList.remove("error");
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains("error-message")) {
      errorMsg.remove();
    }
  }
  correo.addEventListener("input", function () {
    const valor = correo.value.trim();
    if (!valor.includes("@")) {
      correo.classList.add("error");
      tooltip.style.display = "block";
    } else {
      correo.classList.remove("error");
      tooltip.style.display = "none";
    }
});

});
