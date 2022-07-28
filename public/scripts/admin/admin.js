function logout() {
  fetch("/logout", { method: "get" });
}

async function getDrivers() {
  let data = await fetch("/admin/getAllDrivers");
}

const html = `<div class="col">
<div class="card shadow-sm">
  <svg
    class="bd-placeholder-img card-img-top"
    width="100%"
    height="225"
    xmlns=""
    role="img"
    aria-label="Placeholder: Thumbnail"
    preserveAspectRatio="xMidYMid slice"
    focusable="false"
  >
    <title>Placeholder</title>
    <rect width="100%" height="100%" fill="#55595c" />
    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
      Thumbnail
    </text>
  </svg>

  <div class="card-body">
    <p class="card-text">Name:</p>
    <div
      class="d-flex justify-content-between align-items-center"
    >
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
        >
          View
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
        >
          Dismiss
        </button>
      </div>
      <!-- View and Edit end -->
      <small class="text-muted">9 mins</small>
    </div>
    <!--  -->
  </div>`;
