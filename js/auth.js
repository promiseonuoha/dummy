document
  .getElementById("form-signup")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.textContent = "Please wait..."; // Change button text

    const formData = {
      fullName: document.getElementById("fullName").value,
      userName: document.getElementById("userName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value,
      bitcoinAddress: document.getElementById("bitcoinAddress").value,
    };

    try {
      const response = await fetch(
        "https://api-exquisite.up.railway.app/api/v1/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Show success toast
        Toastify({
          text: "Sign up successful!",
          duration: 3000,
          gravity: "top", // Position on top
          position: "center", // Center alignment
          backgroundColor: "#28a745",
        }).showToast();
        localStorage.setItem("userEmail", formData.email);
        window.location.href = "/sign-up/email-verification";
      } else {
        // Show error toast
        Toastify({
          text: `Error: ${result.description || "Sign up failed"}`,
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#dc3545",
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: error?.message || "Sign up failed",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#dc3545",
      }).showToast();
    } finally {
      submitBtn.textContent = "Sign Up"; // Reset button text
    }
  });
