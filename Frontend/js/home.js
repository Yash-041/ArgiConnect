 <script>
      document
        .querySelector(".btn-learn")
        .addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelector(".secondary-section").scrollIntoView({
            behavior: "smooth",
          });
        });

      const featureItems = document.querySelectorAll(".feature-item");
      featureItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-5px)";
          this.style.transition = "transform 0.3s ease";
        });

        item.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0)";
        });
      });

      document
        .querySelector(".btn-join")
        .addEventListener("click", function (e) {
          this.style.transform = "scale(0.95)";
          setTimeout(() => {
            this.style.transform = "scale(1)";
          }, 150);
        });
    </script>