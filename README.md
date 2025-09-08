Ejercicio propuesto

Se utilizará la API gratuita JSONPlaceholder:

https://jsonplaceholder.typicode.com/users → lista de usuarios.

https://jsonplaceholder.typicode.com/posts?userId=ID → publicaciones de un usuario.

Obtener los primeros 3 usuarios desde la API.

Para cada usuario, obtener sus publicaciones.

Implementar dos enfoques:

(A) Secuencial.

(B) Concurrente con Promise.all.

Mostrar en consola:

Nombre del usuario.

Cantidad de publicaciones de ese usuario.

Ejemplo de salida en consola
--- Ejecución Secuencial ---
Leanne Graham tiene 10 publicaciones
Ervin Howell tiene 10 publicaciones
Clementine Bauch tiene 10 publicaciones

--- Ejecución Paralela ---
Leanne Graham tiene 10 publicaciones
Ervin Howell tiene 10 publicaciones
Clementine Bauch tiene 10 publicaciones