// course.js - populate courses, filter and calculate credits
document.addEventListener('DOMContentLoaded', () => {
  const courses = [
    { id: "wdd130", title: "WDD 130", credits: 3, certificate: "WDD", completed: true },
    { id: "wdd131", title: "WDD 131", credits: 3, certificate: "WDD", completed: true },
    { id: "wdd231", title: "WDD 231", credits: 3, certificate: "WDD", completed: false },
    { id: "cse101", title: "CSE 101", credits: 3, certificate: "CSE", completed: true },
    { id: "cse201", title: "CSE 201", credits: 3, certificate: "CSE", completed: false }
    // add or edit courses as needed
  ];

  const courseList = document.getElementById('course-list');
  const creditsSummary = document.getElementById('creditsSummary');
  const btns = document.querySelectorAll('.filter-btn');

  function renderCourses(list) {
    courseList.setAttribute('aria-busy', 'true');
    courseList.innerHTML = '';

    list.forEach(course => {
      const card = document.createElement('article');
      card.className = 'course-card ' + (course.completed ? 'completed' : 'not-completed');
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <img src="images/course-placeholder.jpg" alt="${course.title} icon" width="64" height="64">
        <div class="course-info">
          <h3 class="course-title">${course.title}</h3>
          <p class="course-meta">${course.certificate} • ${course.credits} credits • ${course.completed ? 'Completed' : 'Not completed'}</p>
        </div>
      `;
      courseList.appendChild(card);
    });

    // update credits summary
    const totalCredits = list.reduce((sum, c) => sum + (c.credits || 0), 0);
    creditsSummary.textContent = `Total credits for displayed courses: ${totalCredits}`;
    courseList.setAttribute('aria-busy', 'false');
  }

  // initial render: all courses
  renderCourses(courses);

  // Filter button behavior
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.dataset.filter;
      // manage aria-pressed states
      btns.forEach(b => b.setAttribute('aria-pressed', 'false'));
      e.currentTarget.setAttribute('aria-pressed', 'true');

      if (filter === 'all') {
        renderCourses(courses);
      } else {
        const filtered = courses.filter(c => c.certificate === filter);
        renderCourses(filtered);
      }
    });
  });

  // Accessibility: keyboard support for filter buttons
  btns.forEach(b => {
    b.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        b.click();
      }
    });
  });

});
