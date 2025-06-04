document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: [
        // عدة أيام إجازة
        { title: '', start: '2025-06-10', className: 'holiday-event' },
        { title: '', start: '2025-06-15', className: 'holiday-event' },
        { title: '', start: '2025-06-20', className: 'holiday-event' },

        // غياب
        { title: '', start: '2025-06-14', className: 'absence-event' },
        { title: '', start: '2025-06-8', className: 'absence-event' },
        
        // حضور
        { title: '', start: '2025-06-12', className: 'present-event' },
        { title: '', start: '2025-06-26', className: 'present-event' },

        // رحلات
        { title: '', start: '2025-06-11', className: 'trips-event' },
        { title: '', start: '2025-06-25', className: 'trips-event' },
        { title: '', start: '2025-06-4', className: 'trips-event' },
      ],
      eventDidMount: function (info) {
        // نخفي النص داخل الحدث
        info.el.style.display = 'none';

        // نضيف لون للخلفية حسب نوع الحدث
        let dateStr = info.event.start.toISOString().split('T')[0];
        let dayCell = document.querySelector(
          `.fc-daygrid-day[data-date="${dateStr}"]`
        );

        if (dayCell) {
          if (info.event.classNames.includes('holiday-event')) {
            dayCell.classList.add('holiday-td');
          } 
          if (info.event.classNames.includes('absence-event')) {
            dayCell.classList.add('absence-td');
          }
          if (info.event.classNames.includes('present-event')) {
            dayCell.classList.add('present-td');
          }
          if (info.event.classNames.includes('trips-event')) {
            dayCell.classList.add('trips-td');
          }
        }
      }
    });

    calendar.render();
  });