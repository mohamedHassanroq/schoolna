 document.addEventListener("DOMContentLoaded", function () {
    var register_student_for_each_stage = {
      series: [{
          name: 'Girls',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 60, 66]
        }, {
          name: 'Boys',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 60, 66]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
            show: false,
        }
      },
      colors:["#1537e2", "#e9ecf2"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadius: 8,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Oct", "Nov", "Sep"],
            labels: {
            style: {
                colors: "#5D5D5D",
                fontSize: '16px',
                fontFamily: 'Tajawal',
                fontWeight: 400,
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
        },
        axisBorder: {
            show: true,
            color: '#8B8080',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0
        },
        crosshairs: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
      },
      yaxis: {
        opposite: true,
        tickAmount: 5,
        labels: {
            style: {
                colors: ["#5D5D5D"],
                fontSize: '16px',
                fontFamily: 'Tajawal',
                fontWeight: 400,
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: function (val) {
                return (val / 1000) + "K";
            }
        },
        axisBorder: {
            show: false,
        },
      },
      grid: {
        show: true,
        borderColor: "#6958583D",
        strokeDashArray: 10,
      },
      fill: {
        opacity: 1,
      },
      legend: {
        show: false,
      }
    };


    let chart1 = new ApexCharts(document.querySelector("#register_student_for_each_stage"), register_student_for_each_stage);
    chart1.render();

    
  });
