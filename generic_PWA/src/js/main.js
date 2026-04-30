// Script principal do Generic PWA

document.addEventListener('DOMContentLoaded', () => {
  console.log('Generic PWA carregado!');
  
  // Exemplo de funcionalidade adicional
  const app = document.getElementById('app');
  
  // Adiciona um evento de clique ao título
  const title = app.querySelector('h1');
  if (title) {
    title.addEventListener('click', () => {
      alert('Bem-vindo ao Generic PWA!');
    });
  }
  
  // Verifica se está rodando como PWA
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Rodando como PWA');
  }
});
