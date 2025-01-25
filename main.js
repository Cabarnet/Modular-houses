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

let currentIndex = 0;
const thumbnails = document.querySelectorAll('.thumbnails img');
const mainImage = document.getElementById('currentImage');

function changeImage(thumbnail) {
    fadeOut(mainImage, () => {
        mainImage.src = thumbnail.src;
        fadeIn(mainImage);
        currentIndex = Array.from(thumbnails).indexOf(thumbnail);
    });
}

function autoChangeImage() {
    fadeOut(mainImage, () => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        mainImage.src = thumbnails[currentIndex].src;
        fadeIn(mainImage);
    });
}

function fadeOut(element, callback) {
    element.classList.add('fade-out');
    setTimeout(() => {
        callback();
    }, 300); // Длительность анимации должна совпадать с transition в CSS
}

function fadeIn(element) {
    element.classList.remove('fade-out');
}

setInterval(autoChangeImage, 15000);

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        changeImage(thumbnail);
        currentIndex = index; // Update the current index on click
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".realise-animation");

  const revealBlocks = () => {
    blocks.forEach((block) => {
      const blockTop = block.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (blockTop < windowHeight - 50) {
        block.classList.add("visible");
        block.classList.remove("hidden");
      }
    });
  };

  // Первичная проверка
  revealBlocks();

  // Срабатывание при прокрутке
  window.addEventListener("scroll", revealBlocks);
});