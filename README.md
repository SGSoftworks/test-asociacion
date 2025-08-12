# React + Firebase Test App

## Resumen

Proyecto simple en React + Tailwind que guarda respuestas en Firestore y muestra estadísticas en tiempo real.

## Pasos rápidos

1. Crea un proyecto en Firebase -> Firestore (modo nativo) y Authentication (Email/Password).
2. Copia la configuración en `src/firebase.js`.
3. Instala dependencias: `npm install`.
4. Corre local: `npm run dev`.
5. Build para Netlify: `npm run build` y sube el `dist` (Netlify usa `npm run build`).

## Firestore rules (mínimas para pruebas)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /responses/{doc} {
      allow create: if request.resource.data.name is string && request.resource.data.answers is list;
      allow read: if true;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Notas

- Esta es una base. Para producción: agrega validaciones más estrictas, sanitiza entradas, usa Cloud Functions para agregados si aumentan las respuestas y protege la colección de respuestas si contiene datos sensibles.
