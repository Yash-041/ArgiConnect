var price = 0;
var equipmentName = "";
var equipmentImage = "";
var isModalOpen = false;

function openRentModal(name, image, price_text) {
  isModalOpen = true;
  equipmentName = name;
  equipmentImage = image;

  var modal = document.getElementById("rentModal");
  var equipmentNameElement = document.getElementById("modalEquipmentName");
  var equipmentImageElement = document.getElementById("modalEquipmentImage");
  var equipmentPriceElement = document.getElementById("modalEquipmentPrice");

  equipmentNameElement.textContent = name;
  equipmentImageElement.src = image;
  equipmentPriceElement.textContent = price_text;

  var priceWithoutRupee = price_text.replace("₹", "");
  var priceWithoutDay = priceWithoutRupee.replace("/day", "");
  var priceWithoutComma = priceWithoutDay.replace(",", "");
  var priceNumber = parseInt(priceWithoutComma);

  if (isNaN(priceNumber)) {
    priceNumber = 0;
  }

  price = priceNumber;

  var smallText = document.querySelector(".cost-display small");
  if (smallText) {
    smallText.style.display = "none";
  }

  if (modal) {
    modal.style.display = "flex";
  } else {
    alert("Something went wrong opening the popup");
    return;
  }

  document.body.style.overflow = "hidden";
  calculateCost();
}

function closeRentModal() {
  isModalOpen = false;

  var smallText = document.querySelector(".cost-display small");
  if (smallText) {
    smallText.style.display = "block";
  }

  var modal = document.getElementById("rentModal");
  if (modal) {
    modal.style.display = "none";
  }

  document.body.style.overflow = "auto";

  equipmentName = "";
  equipmentImage = "";
  price = 0;
}

// function to calculate total cost when dates are selected
function calculateCost() {
  // get the start and end dates
  var startDateInput = document.getElementById("startDate");
  var endDateInput = document.getElementById("endDate");
  var startDate = new Date(startDateInput.value);
  var endDate = new Date(endDateInput.value);

  // check if both dates are selected and valid (this logic took me ages)
  var datesAreValid = false;

  if (startDate && endDate) {
    console.log("Both dates exist");
    if (endDate > startDate) {
      console.log("End date is after start date - good!");
      datesAreValid = true;
    } else {
      console.log("End date is not after start date - bad!");
    }
  } else {
    console.log("One or both dates are missing");
  }

  if (datesAreValid) {
    // calculate number of days (math is hard)
    var startTime = startDate.getTime();
    var endTime = endDate.getTime();
    var timeDifference = endTime - startTime;

    console.log("Time difference in milliseconds: " + timeDifference);

    // convert to days (1000ms * 60s * 60m * 24h = 1 day)
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var numberOfDays = timeDifference / millisecondsPerDay;
    numberOfDays = Math.ceil(numberOfDays);

    var totalCost = numberOfDays * price;

    var costElement = document.getElementById("totalCost");
    if (costElement) {
      var formattedCost = "₹ " + totalCost.toLocaleString("en-IN") + ".00";
      costElement.textContent = formattedCost;
    }
  } else {
    var costElement = document.getElementById("totalCost");
    if (costElement) {
      var singleDayCost = "₹ " + price.toLocaleString("en-IN") + ".00";
      costElement.textContent = singleDayCost;
    }
  }
}

// function when user submits the booking form
function handleBookingSubmit(event) {
  event.preventDefault();

  if (!isModalOpen) {
    return;
  }

  var formData = new FormData(event.target);

  var currentEquipmentName =
    document.getElementById("modalEquipmentName").textContent;

  var locationValue = formData.get("location");
  var mobileValue = formData.get("mobile");
  var startDateValue = formData.get("startDate");
  var endDateValue = formData.get("endDate");
  var totalCostValue = document.getElementById("totalCost").textContent;

  var hasErrors = false;

  if (!locationValue || locationValue.trim() === "") {
    hasErrors = true;
  }

  if (!mobileValue || mobileValue.trim() === "") {
    hasErrors = true;
  }

  if (!startDateValue) {
    hasErrors = true;
  }

  if (hasErrors) {
    alert("Please fill all required fields!");
    return;
  }

  var bookingData = {
    equipment: currentEquipmentName,
    location: locationValue,
    mobile: mobileValue,
    startDate: startDateValue,
    endDate: endDateValue,
    totalCost: totalCostValue,
    timestamp: new Date(),
  };

  alert("Booking request submitted successfully! We will contact you soon.");

  closeRentModal();
}

function updateBookingStatus(equipmentId, status) {
  var bookingItem = document.querySelector(
    "[data-equipment-id='" + equipmentId + "']"
  );

  if (bookingItem) {
    var statusIcon = bookingItem.querySelector(".status-indicator");

    if (statusIcon) {
      statusIcon.className = "status-indicator " + status;

      if (status === "active") {
        statusIcon.textContent = "✓";
      } else if (status === "pending") {
        statusIcon.textContent = "⏳";
      } else if (status === "completed") {
        statusIcon.textContent = "✅";
      } else {
        statusIcon.textContent = "?";
      }
    }
  }
}

function filterEquipment(searchText, location) {
  if (!searchText) {
    searchText = "";
  }
  if (!location) {
    location = "";
  }

  var equipmentCards = document.querySelectorAll(".equipment-card");

  for (var i = 0; i < equipmentCards.length; i++) {
    var card = equipmentCards[i];

    var nameElement = card.querySelector("h4");
    if (!nameElement) {
      continue;
    }

    var equipmentName = nameElement.textContent;

    var equipmentNameLower = equipmentName.toLowerCase();
    var searchTextLower = searchText.toLowerCase();

    var matchesSearch = equipmentNameLower.includes(searchTextLower);
    var matchesLocation = true;

    if (matchesSearch && matchesLocation) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}

function initializeDashboard() {
  var modal = document.getElementById("rentModal");

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeRentModal();
      }
    });
  }

  var rentForm = document.querySelector(".rent-form");
  if (rentForm) {
    rentForm.addEventListener("submit", handleBookingSubmit);
  }

  var searchButton = document.querySelector(".search-btn");
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      var locationInputs = document.querySelectorAll(".location-field input");
      var location1 = "";
      var location2 = "";

      if (locationInputs[0]) {
        location1 = locationInputs[0].value;
      }
      if (locationInputs[1]) {
        location2 = locationInputs[1].value;
      }

      if (location1 || location2) {
        alert(
          "Search feature coming soon! You searched for: " +
            location1 +
            ", " +
            location2
        );
      } else {
        alert("Please enter a location to search");
      }
    });
  }

  var startDateInput = document.getElementById("startDate");
  var endDateInput = document.getElementById("endDate");

  if (startDateInput && endDateInput) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    var todayString = year + "-" + month + "-" + day;

    startDateInput.min = todayString;
    endDateInput.min = todayString;

    startDateInput.addEventListener("change", function () {
      endDateInput.min = startDateInput.value;

      if (endDateInput.value && endDateInput.value < startDateInput.value) {
        endDateInput.value = "";
        alert(
          "End date cannot be before start date. Please select end date again."
        );
      }

      calculateCost();
    });

    endDateInput.addEventListener("change", function () {
      calculateCost();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeDashboard();
});

window.openRentModal = openRentModal;
window.closeRentModal = closeRentModal;
window.calculateCost = calculateCost;
