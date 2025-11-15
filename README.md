# VitalBox - Proyecto Flask con HTML Modular

## Descripción

VitalBox es una aplicación web desarrollada con Flask que implementa principios de modularidad mediante bloques de extensión HTML y componentes reutilizables. El proyecto ofrece un servicio de entrega de comidas saludables y balanceadas, con información sobre propuesta de valor, servicios y contacto.

## Características

- **Arquitectura modular**: Utiliza plantillas base con bloques de extensión (`{% extends %}`, `{% block %}`)
- **Componentes reutilizables**: Header, navbar, aside y footer incluidos mediante `{% include %}`
- **Diseño con CSS Grid**: Layout de 3 columnas (navbar vertical, contenido central, sidebar derecho)
- **Colores de VitalBox**: Paleta verde saludable (rgb(165, 214, 167), rgb(76, 175, 80))
- **Validación de formularios**: JavaScript para validar datos del usuario
- **Contenido multimedia**: Video de BBC y tabla de productos
- **Tres páginas principales**: Inicio, Servicios y Contacto

## Estructura del Proyecto

```
vitalbox_flask_final/
├── app.py                          # Aplicación Flask principal
├── templates/                      # Plantillas HTML
│   ├── base.html                   # Plantilla base con bloques
│   ├── index.html                  # Página de inicio
│   ├── servicios.html              # Página de servicios
│   ├── contacto.html               # Página de contacto
│   └── includes/                   # Componentes reutilizables
│       ├── header.html             # Encabezado con logo
│       ├── navbar.html             # Barra de navegación vertical
│       ├── aside.html              # Sidebar con video y tabla
│       └── footer.html             # Pie de página
├── static/                         # Archivos estáticos
│   ├── css/
│   │   └── estilos.css             # Estilos CSS con Grid
│   ├── js/
│   │   └── validacion.js           # Validación de formularios
│   └── assets/
│       ├── logo.PNG                # Logo de VitalBox
│       └── BBC.mp4                 # Video informativo
└── README.md                       # Este archivo
```

## Layout del Proyecto

El proyecto utiliza **CSS Grid** con la siguiente distribución:

```
┌─────────────┬──────────────────────┬─────────────────┐
│   HEADER    │                      │                 │
│  (Logo +    │                      │                 │
│   Título)   │                      │                 │
├─────────────┤      CONTENIDO       │     ASIDE       │
│             │       PRINCIPAL      │   (Video +      │
│   NAVBAR    │      (Secciones)     │    Tabla +      │
│  (Vertical) │                      │    Lista)       │
│             │                      │                 │
├─────────────┴──────────────────────┴─────────────────┤
│                     FOOTER                            │
└───────────────────────────────────────────────────────┘
```

## Requisitos Previos

- Python 3.7 o superior
- pip (gestor de paquetes de Python)
- MySQL / MariaDB (si usas las funcionalidades que guardan datos en la base de datos)

## Instalación

### 1. Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd vitalbox_flask_final
```

### 2. Crear un entorno virtual (recomendado)

```bash
python3 -m venv venv
```

### 3. Activar el entorno virtual

**En Linux/Mac:**
```bash
source venv/bin/activate
```

**En Windows:**
```powershell
venv\Scripts\activate
```

### 4. Instalar dependencias

Si se dispone de `requirements.txt`:
```bash
pip install -r requirements.txt
```

O instalar Flask y la librería MySQL directamente:
```bash
pip install flask flask-mysqldb
```

## Ejecución

### 1. Ejecutar la aplicación

```bash
python app.py
```

### 2. Acceder a la aplicación

Abrir un navegador web y visitar:

```
http://127.0.0.1:5000/
```

### 3. Navegación

- **Inicio**: `http://127.0.0.1:5000/` - Propuesta de valor, segmento de clientes y formulario de validación
- **Servicios**: `http://127.0.0.1:5000/servicios` - Información sobre servicios ofrecidos
- **Contacto**: `http://127.0.0.1:5000/contacto` - Formulario de contacto e información

## Detalles Técnicos

### Bloques de Extensión

El proyecto utiliza el sistema de plantillas Jinja2 de Flask con los siguientes bloques:

- **`{% block title %}`**: Define el título de cada página
- **`{% block content %}`**: Define el contenido principal de cada página

### Archivos Include

Los componentes reutilizables se incluyen mediante:

- `{% include 'includes/header.html' %}`: Encabezado con logo de VitalBox
- `{% include 'includes/navbar.html' %}`: Barra de navegación vertical
- `{% include 'includes/aside.html' %}`: Sidebar con video, tabla de productos y lista
- `{% include 'includes/footer.html' %}`: Pie de página con copyright

### Rutas Flask

El archivo `app.py` define las siguientes rutas:

- `/`: Página de inicio
- `/servicios`: Página de servicios
- `/contacto`: Página de contacto

### Validación de Formularios

El archivo `static/js/validacion.js` implementa validación del lado del cliente para:

- Verificar que el nombre no esté vacío
- Validar el formato del correo electrónico
- Mostrar mensajes de error antes de enviar el formulario

### CSS Grid Layout

El diseño utiliza CSS Grid con:

- **3 columnas**: 200px (navbar) | 1fr (contenido) | 350px (aside)
- **4 filas**: auto (header) | auto (espacio) | 1fr (contenido principal) | auto (footer)
- **Responsive**: Se adapta a tablets y móviles

## Base de Datos (MySQL)

La aplicación utiliza MySQL para almacenar las validaciones enviadas desde el formulario. A continuación encontrarás los pasos y el script SQL para crear la base de datos y la tabla requerida.

Prerequisitos:

- Tener un servidor MySQL/MariaDB instalado y en ejecución.
- Conocer un usuario con permisos para crear bases de datos (por ejemplo `root`).

1) Crear la base de datos y la tabla `validacion` (ejecutar en el cliente MySQL o MySQL Workbench):

```sql
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS vitalbox CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE vitalbox;

-- Crear la tabla `validacion`
CREATE TABLE IF NOT EXISTS validacion (
  ID_Validacion INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  interes VARCHAR(100),
  precio VARCHAR(50),
  comentario TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2) (Opcional) Asignar permisos a un usuario específico (cambia `mi_usuario` y `mi_password` según corresponda):

```sql
CREATE USER IF NOT EXISTS 'mi_usuario'@'localhost' IDENTIFIED BY 'mi_password';
GRANT ALL PRIVILEGES ON vitalbox.* TO 'mi_usuario'@'localhost';
FLUSH PRIVILEGES;
```

3) Configurar las credenciales en `vitalbox_flask_final/app.py` (líneas de configuración):

- `app.config['MYSQL_HOST']` — host de la base de datos (por defecto `localhost`).
- `app.config['MYSQL_USER']` — usuario de MySQL (por ejemplo `root` o `mi_usuario`).
- `app.config['MYSQL_PASSWORD']` — contraseña del usuario.
- `app.config['MYSQL_DB']` — nombre de la base de datos (debe ser `vitalbox`).

Ejemplo (ajusta según tu entorno):

```python
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''  # o 'mi_password'
app.config['MYSQL_DB'] = 'vitalbox'
```

4) Reiniciar la aplicación Flask después de cambiar la configuración.

Notas y consejos:

- Si instalas `mysqlclient` en Windows y tienes problemas, puede requerir las Build Tools de Visual Studio; como alternativa puedes usar una capa como `PyMySQL` y el conector correspondiente.
- Asegúrate de que el servidor MySQL esté escuchando en `localhost` y que el puerto por defecto (3306) no esté bloqueado por un firewall local.

Con esto la aplicación podrá insertar, listar y eliminar registros en la tabla `validacion` mediante las rutas definidas en `app.py` (`/insertar`, `/consulta`, `/eliminar/<id>`).

## Personalización

### Modificar colores

Editar `static/css/estilos.css` y cambiar los valores RGB:

- **Verde principal**: `rgb(165, 214, 167)`
- **Verde botones**: `rgb(76, 175, 80)`
- **Verde oscuro**: `rgb(46, 125, 50)`

### Agregar nuevas páginas

1. Crear un nuevo archivo HTML en `templates/` que extienda `base.html`
2. Agregar una nueva ruta en `app.py`
3. Actualizar `navbar.html` para incluir el enlace

### Modificar componentes comunes

Editar los archivos en `templates/includes/` para cambiar el header, navbar, aside o footer en todas las páginas simultáneamente.

### Actualizar contenido multimedia

- Reemplazar `static/assets/logo.PNG` con tu propio logo
- Reemplazar `static/assets/BBC.mp4` con tu propio video
- Actualizar las rutas en los archivos HTML si cambias los nombres

## Funcionalidades Principales

### Página de Inicio

- **Propuesta de valor**: Descripción del servicio de comidas saludables
- **Segmento de clientes**: Definición del público objetivo
- **Formulario de validación**: Captura de interés con campos para nombre, correo, interés, precio y comentarios

### Página de Servicios

- Planes de alimentación personalizados
- Entrega a domicilio
- Asesoría nutricional
- Menú semanal variado

### Página de Contacto

- Formulario de contacto completo
- Información de contacto (email, teléfono, dirección)
- Enlaces a redes sociales

### Sidebar (Aside)

- Video informativo de BBC sobre alimentos ultraprocesados
- Tabla de productos con precios (Ensalada Vital, Pollo al curry, Batido energético)
- Lista de bebidas disponibles

## Tecnologías Utilizadas

- **Flask**: Microframework web de Python
- **Jinja2**: Motor de plantillas (incluido con Flask)
- **HTML5**: Estructura de las páginas
- **CSS3**: Estilos con CSS Grid y diseño responsivo
- **JavaScript**: Validación de formularios del lado del cliente

## Estructura Modular

Este proyecto implementa los siguientes principios de modularidad:

1. **Plantilla base (`base.html`)**: Define la estructura común con bloques `{% block title %}` y `{% block content %}`
2. **Extensión de plantillas**: Cada página extiende `base.html` usando `{% extends "base.html" %}`
3. **Componentes reutilizables**: Header, navbar, aside y footer se incluyen con `{% include %}`
4. **Separación de responsabilidades**: Lógica (Python), presentación (HTML), estilos (CSS) y comportamiento (JS) están separados

## Requisitos Técnicos Cumplidos

### Según la Rúbrica de Evaluación

1. ✅ **Estructura sugerida del proyecto**: Implementada con templates/ e includes/
2. ✅ **Uso de bloques de extensión**: `{% block content %}` y `{% block title %}`
3. ✅ **Inclusión de secciones**: `{% include 'includes/navbar.html' %}`, etc.
4. ✅ **Estilo visual**: CSS aplicado con colores de VitalBox
5. ✅ **Documentación**: README.md completo con instrucciones

### Bloques Implementados

- **`{% block title %}`**: Título personalizado por página
- **`{% block content %}`**: Contenido principal de cada página

### Includes Implementados

- **`{% include 'includes/header.html' %}`**: Encabezado
- **`{% include 'includes/navbar.html' %}`**: Navegación
- **`{% include 'includes/aside.html' %}`**: Sidebar
- **`{% include 'includes/footer.html' %}`**: Pie de página
