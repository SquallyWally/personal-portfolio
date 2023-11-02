async function updateVisitorCount() {
  try {
    const response = await fetch(secrets.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    document.getElementById("visitor").innerHTML = data.Attributes.visitors;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}

updateVisitorCount();
