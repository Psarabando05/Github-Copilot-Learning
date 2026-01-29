const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const value = btn.textContent;

    if (action === 'clear') {
      display.value = '';
      return;
    }

    if (action === 'delete') {
      display.value = display.value.slice(0, -1);
      return;
    }

    if (action === 'equals') {
      compute();
      return;
    }

    if (action === 'operator') {
      const last = display.value.slice(-1);
      if (['+','-','×','÷','.'].includes(last)) {
        display.value = display.value.slice(0, -1) + value;
      } else {
        display.value += value;
      }
      return;
    }

    // digit or dot
    display.value += value;
  });
});

function compute(){
  try{
    let expr = display.value.replace(/×/g, '*').replace(/÷/g, '/');
    if (/[^0-9+\-*/.() ]/.test(expr)) throw new Error('Entrada inválida');
    const result = Function('"use strict"; return (' + expr + ')')();
    if (!isFinite(result)) {
      display.value = 'Erro';
    } else {
      display.value = String(result);
    }
  }catch(e){
    display.value = 'Erro';
  }
}

// Allow Enter to compute
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') compute();
});
