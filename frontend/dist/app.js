function updateVisitorCount() {
    
  let visitorCount = parseInt(localStorage.getItem("visitorCount")) || 0;

  visitorCount++;

  document.getElementById("visitor").innerHTML = visitorCount;

  localStorage.setItem("visitorCount", visitorCount);
}

updateVisitorCount();
