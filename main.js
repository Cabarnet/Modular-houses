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
  const realiseBlocks = document.querySelectorAll(".realise-animation");

  const revealBlocks = () => {
    realiseBlocks.forEach((block) => {
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

if (document.querySelector(".to-full-screen__block")) {
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

  // Прокрутка
  document.querySelectorAll(".to-full-screen__block").forEach(block => {
    let images = [];
    let currentIndex = 0;
    
    document.querySelectorAll(".to-full-screen__block").forEach(block => {
      const imgElements = block.querySelectorAll(".to-full-screen");
    
      imgElements.forEach((img, index) => {
          img.addEventListener("click", function () {
              images = Array.from(imgElements); // Обновляем массив изображений при каждом клике
              currentIndex = index;
              openFullscreen();
          });
      });
    });
    
    function openFullscreen() {
      document.getElementById("fullscreen-image").src = images[currentIndex].src;
      document.getElementById("fullscreen-container").style.display = "flex";
    }
    
    function closeFullscreen() {
      document.getElementById("fullscreen-container").style.display = "none";
    }
    
    function nextImage() {
      if (images.length === 0) return;
      currentIndex = (currentIndex + 1) % images.length;
      document.getElementById("fullscreen-image").src = images[currentIndex].src;
    }
    
    function prevImage() {
      if (images.length === 0) return;
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
}

// Аккодрион
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

// Слайдер картинок производства
document.addEventListener("DOMContentLoaded", () => {
  const mainSlide = document.querySelector('.manufacture__slider .slider-main img');
  const sliderIcons = document.querySelectorAll('.manufacture__slider .slider-icons img');
  let currentMainImage = '';

  document.querySelector('.manufacture__slider .controls #next').addEventListener('click', () => {
    mainSlide.classList.add('transition');
    setTimeout(() => {
      currentMainImage = mainSlide.src;
      mainSlide.src = sliderIcons[0].src;
      sliderIcons[0].src = sliderIcons[1].src;
      sliderIcons[1].src = currentMainImage;
      mainSlide.classList.remove('transition');
    }, 300);
  });

  document.querySelector('.manufacture__slider .controls #prev').addEventListener('click', () => {
    mainSlide.classList.add('transition');
    setTimeout(() => {
      mainSlide.classList.remove('transition');
      currentMainImage = mainSlide.src;
      mainSlide.src = sliderIcons[1].src;
      sliderIcons[1].src = sliderIcons[0].src;
      sliderIcons[0].src = currentMainImage;
  }, 300);
  });
});