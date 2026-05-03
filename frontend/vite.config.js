import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // добавляем этот импорт

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(), // подключаем плагин
    ],
})