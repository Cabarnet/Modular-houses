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

// Появление при прокрутке
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

document.querySelectorAll(".to-full-screen").forEach(img => {
  img.addEventListener("click", function() {
      document.getElementById("fullscreen-image").src = this.src;
      document.getElementById("fullscreen-container").style.display = "flex";
  });
});

document.getElementById("fullscreen-container").addEventListener("click", function(event) {
  if (event.target === this || event.target.id === "close-btn") {
      this.style.display = "none";
  }
});
document.querySelectorAll(".to-full-screen__block").forEach(block => {
  let images = [];
  let currentIndex = 0;

  // Получаем все изображения внутри блока
  const imgElements = block.querySelectorAll(".to-full-screen");
  
  imgElements.forEach((img, index) => {
      img.addEventListener("click", function () {
          images = Array.from(imgElements); // Обновляем только для текущего блока
          openFullscreen(index);
      });
  });

  function openFullscreen(index) {
      currentIndex = index;
      document.getElementById("fullscreen-image").src = images[currentIndex].src;
      document.getElementById("fullscreen-container").style.display = "flex";
  }

  function closeFullscreen() {
      document.getElementById("fullscreen-container").style.display = "none";
  }

  function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      document.getElementById("fullscreen-image").src = images[currentIndex].src;
  }

  function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      document.getElementById("fullscreen-image").src = images[currentIndex].src;
  }

  document.getElementById("close-btn").addEventListener("click", closeFullscreen);
  document.getElementById("fullscreen-container").addEventListener("click", function (event) {
      if (event.target === this) closeFullscreen();
  });
  document.getElementById("next-btn").addEventListener("click", nextImage);
  document.getElementById("prev-btn").addEventListener("click", prevImage);

  document.addEventListener("keydown", function (event) {
      if (document.getElementById("fullscreen-container").style.display === "flex") {
          if (event.key === "ArrowRight") nextImage();
          if (event.key === "ArrowLeft") prevImage();
          if (event.key === "Escape") closeFullscreen();
      }
  });
});

document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", function () {
      let parent = this.parentElement;
      let content = parent.querySelector(".accordion-content");
      let icon = this.querySelector(".accordion-icon");

      if (parent.classList.contains("active")) {
          // Закрываем
          content.style.maxHeight = content.scrollHeight + "px"; // Фиксируем высоту
          setTimeout(() => {
              content.style.maxHeight = "0"; // Затем схлопываем
          }, 1);
          parent.classList.remove("active");
        
      } else {
          // Открываем текущий
          parent.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
          
      }
  });
});
