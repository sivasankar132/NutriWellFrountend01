import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    console.error('NutriWell root mounting error:', error);
    rootElement.innerHTML = `
      <div style="min-height:100vh; display:flex; align-items:center; justify-content:center; background-color:#020617; color:#f8fafc; font-family:sans-serif; padding:20px; text-align:center;">
        <div style="max-width:500px; padding:24px; border-radius:16px; background:#0f172a; border:1px solid #ef4444;">
          <h2 style="color:#ef4444; margin-top:0;">NutriWell Mounting Error</h2>
          <p style="color:#94a3b8; font-size:14px;">An error occurred while initializing the application.</p>
          <pre style="text-align:left; background:#020617; color:#fca5a5; padding:12px; border-radius:8px; font-size:12px; overflow-x:auto;">${error instanceof Error ? error.message : String(error)}</pre>
        </div>
      </div>
    `;
  }
}
