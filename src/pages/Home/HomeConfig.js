// Settings for the University Slider
const uniSliderSettings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 200,
    autoplaySpeed: 1800,
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
const teamSliderSettings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 1600,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 615,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
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

const teamMembers = [
  {
    fullName: "Harsha Bharadwaj",
    title: "Founder and Managing Director",
    linkedInIrl: "https://www.linkedin.com/in/harsha-bharadwaj-8a5219204",
    imageUrl: "./team_speer/harsha.jpeg",
  },  {
    fullName: "Ibrahim Sait",
    title: "Co-founder and Chief Marketing Officer",
    linkedInIrl: "https://www.linkedin.com/in/ibrahim-sait/",
    imageUrl: "./team_speer/ibrahim.jpeg",
  },
  {
    fullName: "Parv Bhadra",
    title: "Chief Technology Officer",
    linkedInIrl: "https://www.linkedin.com/in/parvbhadra/",
    imageUrl: "./team_speer/parv.jpeg",
  },
  {
    fullName: "Ee Hsin Kok",
    title: "Lead Web Developer",
    linkedInIrl: "https://www.linkedin.com/in/eehsinkok/",
    imageUrl: "./team_speer/eehsin.jpg",
  },
  {
    fullName: "Varnika Seth",
    title: "Chief Designing Officer",
    linkedInIrl: "https://www.linkedin.com/in/varnika-seth-754522215",
    imageUrl: "./team_speer/varnika.jpeg",
  },

  {
    fullName: "Hardik Mahajan",
    title: "General Manager",
    linkedInIrl: "https://www.linkedin.com/in/hardik-mahajan-235b5820b/",
    imageUrl: "./team_speer/harry.jpeg",
  },
  {
    fullName: "Chew Tzi Hwee",
    title: "Web Developer",
    linkedInIrl: "https://www.linkedin.com/in/imjustchew/",
    imageUrl: "./team_speer/chew.png",
  },
  {
    fullName: "Darius Chan",
    title: "Regional Director of Asia",
    linkedInIrl: "https://www.linkedin.com/in/darius-chan-626034213",
    imageUrl: "./team_speer/darius.jpeg",
  },
]

export {uniSliderSettings, teamSliderSettings, sliderItems, teamMembers};