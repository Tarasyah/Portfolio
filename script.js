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



