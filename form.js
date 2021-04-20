
document.querySelectorAll('.form input').forEach(input => {
  
  input.addEventListener('blur', e => {
   
    if (input.value.length === 0) {
      input.classList.remove('input-in');
    }
  });

  input.addEventListener('focus', e => {
      input.classList.add('input-in');
    
  });
  
});
