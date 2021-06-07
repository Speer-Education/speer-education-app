// Settings for the University Slider
const sliderSettings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 200,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
//   The items in the Uni Slider
const sliderItems = [
    {title: 'LSE', src: 'https://static1.s123-cdn-static-a.com/uploads/5219948/400_60a66de4946c3.png'},
    {title: 'Cambridge', src: "https://concourse.global/wp-content/uploads/2019/05/university-of-cambridge-2-logo.png"},
    {title: 'NorthWestern', src: 'https://static1.s123-cdn-static-a.com/uploads/5219948/400_60a66e2582a79.png'},
    {title: 'Yale-NUS', src: 'https://static1.s123-cdn-static-a.com/uploads/5219948/400_60a66cae30cc1.png'},
    {title: 'UCL' , src: 'https://static1.s123-cdn-static-a.com/uploads/5219948/400_60a673595dd47_filter_60a674db37e91.jpg'},
    {title: 'University Of Warwick', src: 'https://static1.s123-cdn-static-a.com/uploads/5219948/400_60a66c5c94505.png'},
    {title: 'University Of Sheffield', src: 'https://static1.s123-cdn-static-a.com/uploads/5219948/400_60a66ec223e5f_filter_60a672e3bdda1.png'}
]

export {sliderSettings, sliderItems};