function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, ''); // Удалить все нецифровые символы
    let formattedValue = '';
  
    if (value.length > 0) {
      formattedValue = '(' + value.substring(0, 3);
    }
    if (value.length >= 4) {
      formattedValue += ') ' + value.substring(3, 6);
    }
    if (value.length >= 7) {
      formattedValue += '-' + value.substring(6, 8);
    }
    if (value.length >= 9) {
      formattedValue += '-' + value.substring(8, 10);
    }
  
    input.value = formattedValue;
  }