class Typewriter {
  constructor($wrap) {
    this.$wrap = $wrap;
    this.$type = this.$wrap.find(".anim-type");
    this.text = this.$type.data("text");
    this.index = 0;
    this.typing = true;

    this.typeIt();
  }

  typeIt() {
    if (this.index < this.text[0].length) {
      this.$type.append(this.text[0][this.index]);
      this.index++;
      setTimeout(() => this.typeIt(), 100);
    } else {
      setTimeout(() => this.deleteIt(), 1000);
    }
  }

  deleteIt() {
    if (this.index > 0) {
      this.$type.text(this.$type.text().slice(0, -1));
      this.index--;
      setTimeout(() => this.deleteIt(), 100);
    } else {
      this.typing = !this.typing;
      this.text.reverse(); // Swap between texts
      this.typeIt();
    }
  }
}

// Initialize the Typewriter class
$(document).ready(function () {
  const type = new Typewriter($(".anim"));
});

// Lightbox functionality
document.querySelectorAll('.lightbox-trigger').forEach(function(img) {
    img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '1000';

        const imgElement = document.createElement('img');
        imgElement.src = this.src;
        imgElement.style.maxWidth = '80%';
        imgElement.style.maxHeight = '80%';

        lightbox.appendChild(imgElement);
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', function() {
            lightbox.remove();
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        const contents = entry.target.querySelectorAll(".content");
        contents.forEach((content, index) => {
          setTimeout(() => content.classList.add("active"), index * 150);
        });

        // Once active, stop observing to avoid multiple triggers
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Scroll-to-Top Button (Visible based on section observation)
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.id = "scrollTopBtn";
  scrollTopBtn.textContent = "↑";
  scrollTopBtn.style.display = "none"; // Hide by default
  document.body.appendChild(scrollTopBtn);

  // Show the Scroll-to-Top button when the first section is no longer intersecting
  const firstSection = sections[0];
  observer.observe(firstSection);

  const topObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          scrollTopBtn.style.display = "block";
        } else {
          scrollTopBtn.style.display = "none";
        }
      });
    },
    { threshold: 0 }
  );

  topObserver.observe(firstSection);

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
