const PROJECTS = [
  {
    id: "secure-nepal",
    title: "Secure Nepal",
    category: "fullstack",
    subtitle: "Full-Stack",
    liveUrl: "https://secure-nepal-secure-minds-safer-dig.vercel.app/",
    image: null,
    iframeTitle: "Secure Nepal Live Preview",
    fallbackIcon: "ri-shield-check-line",
    fallbackBg: "linear-gradient(135deg, #0a1628, #162544)",
    comingSoon: false,
    showOnHome: true,
  },
];



function buildProjectCard(project, index) {
  const delay = (0.1 + index * 0.05).toFixed(2);
  let imageHTML;

  if (project.liveUrl && !project.comingSoon) {
    const bgStyle = project.fallbackBg
      ? ` style="background: ${project.fallbackBg};"`
      : "";
    const icon = project.fallbackIcon
      ? `<i class="${project.fallbackIcon}"></i>`
      : "";

    imageHTML = `
      <div class="project-image">
        <div class="project-preview">
          <iframe src="${project.liveUrl}" loading="lazy" title="${project.iframeTitle || project.title + " Live Preview"}"></iframe>
          <div class="iframe-fallback"${bgStyle}>
            ${icon}
            <a href="${project.liveUrl}" target="_blank" rel="noopener" class="theme-btn sm">View Live Site <i class="ri-external-link-line"></i></a>
          </div>
        </div>
        <a href="${project.liveUrl}" target="_blank" rel="noopener" class="details-btn"><i class="ri-arrow-right-up-line"></i></a>
      </div>`;
  } else {
    const badge = project.comingSoon
      ? '<span class="coming-soon-badge">Coming Soon</span>'
      : "";
    imageHTML = `
      <div class="project-image">
        <img src="${project.image || ""}" alt="${project.title}" class="project-cover" />
        ${badge}
      </div>`;
  }

  const titleInner =
    project.liveUrl && !project.comingSoon
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener">${project.title}</a>`
      : project.title;

  return `
    <div class="project-item style-two animate-item" data-category="${project.category}" data-delay="${delay}">
      ${imageHTML}
      <div class="project-content">
        <span class="sub-title">${project.subtitle}</span>
        <h3>${titleInner}</h3>
      </div>
    </div>`;
}


document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  
  const visible = PROJECTS.filter((p) => p.showOnHome);
  grid.innerHTML = visible.map((p, i) => buildProjectCard(p, i)).join("");
});
