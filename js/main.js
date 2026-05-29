(function () {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll(".nav a[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) link.classList.add("active");
  });
})();
