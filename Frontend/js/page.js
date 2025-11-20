<script>
      let selectedUserType = null;

      function selectUserType(type) {
        document.querySelectorAll(".user-option").forEach((option) => {
          option.classList.remove("selected");
        });

        document.querySelector(`.${type}-option`).classList.add("selected");
        selectedUserType = type;

        setTimeout(() => {
          proceedToLogin();
        }, 1000);
      }

      function proceedToLogin() {
        const userSelection = document.getElementById("userSelection");
        const loginForm = document.getElementById("loginForm");

        userSelection.style.display = "none";
        loginForm.style.display = "block";

        if (selectedUserType === "farmer") {
          document.getElementById("email").placeholder = "farmer@example.com";
        } else if (selectedUserType === "owner") {
          document.getElementById("email").placeholder = "owner@example.com";
        }
      }

      function showUserSelection() {
        const userSelection = document.getElementById("userSelection");
        const loginForm = document.getElementById("loginForm");

        userSelection.style.display = "block";
        loginForm.style.display = "none";

        document.querySelectorAll(".user-option").forEach((option) => {
          option.classList.remove("selected");
        });
        selectedUserType = null;
      }

      function handleLogin(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (
          (email === "farmer@demo.com" && selectedUserType === "farmer") ||
          (email === "owner@demo.com" && selectedUserType === "owner") ||
          email.includes("demo")
        ) {
          if (password === "demo123") {
            alert(
              `Welcome to AgriConnect! Logging in as ${selectedUserType}...`
            );
            window.location.href = "../index.html";
          } else {
            alert("Invalid password. Use: demo123");
          }
        } else {
          alert(
            "Invalid credentials. Use demo accounts:\nFarmer: farmer@demo.com\nOwner: owner@demo.com\nPassword: demo123"
          );
        }
      }

      // Add entrance animation
      window.addEventListener("load", () => {
        const card = document.querySelector(".selection-card");
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(() => {
          card.style.transition = "all 0.6s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      });
    </script>