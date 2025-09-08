async function obtenerPrimerosNUsers(API_URL,limite = 1) {
    try {
        const urlUsuarios = `${API_URL}/users?_limit=${limite}`;
        const respuesta = await fetch(urlUsuarios);
        if (!respuesta.ok) throw new Error('Error en la respuesta de la API');
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
}

async function obtenerPostsUsuarioId(API_URL, userId) {
    try {
        const urlPosts = `${API_URL}/posts?userId=${userId}`;
        const respuesta = await fetch(urlPosts);
        if (!respuesta.ok) throw new Error('Error en la respuesta de la API');
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
}

async function mainSecuencial() {
    const API_URL = 'https://jsonplaceholder.typicode.com';
    const response = await obtenerPrimerosNUsers(API_URL, 3);
    
    console.log("--- Ejecucion Secuencial ---");
    try {
        for (const user of response) {
            const posts = await obtenerPostsUsuarioId(API_URL, user.id);
            console.log(`Usuario: ${user.name} tiene ${posts.length} publicaciones.`);
        }
        
    }
    catch (error) {
        console.error('Error al procesar los datos:', error);
    }
}

async function mainConcurrente() {
    const API_URL = 'https://jsonplaceholder.typicode.com';

    const users = await obtenerPrimerosNUsers(API_URL, 3);
    console.log("--- Ejecucion Paralella ---");
    try {
        const promesasPosts = users.map(user => 
            obtenerPostsUsuarioId(API_URL, user.id)
        );
           
        const postsPorUsuario = await Promise.all(promesasPosts);
        
        postsPorUsuario.forEach((posts, index) => {
        console.log(`Usuario: ${users[index].name} tiene ${posts.length} publicaciones.`);
        });
    
    } 
    catch (error) {
        console.error('Error al procesar las promesas:', error);
    }

}

mainSecuencial().then( () => {
// Cuando la ejecucuion secuencial termine, se ejecuta la concurrente
    mainConcurrente();
});

