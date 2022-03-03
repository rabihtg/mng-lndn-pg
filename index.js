const navBtn = document.querySelector(".header__nav-btn");
const headerNav = document.querySelector(".header__nav");
const body = document.querySelector("body");
const dotIndicators = [...document.querySelectorAll(".dot-indicator")];
const testimonialsCont = document.querySelector(
  ".testimonials__testimonial-cont"
);
const emailInput = document.querySelector(".email-input");
const emailForm = document.querySelector(".email-updates-form");

let sliderImgIndex = 0;

let testimonialPos = {
  left: 0,
  x: 0,
};

testimonialsCont.addEventListener("mousedown", testimonialMouseDownHandler);
testimonialsCont.addEventListener("touchstart", testimonialTouchstartHandler);

emailForm.addEventListener("submit", emailValidator);

navBtn.addEventListener("click", () => {
  headerNav.classList.toggle("off");
  body.classList.toggle("no-scroll");
});

dotIndicators.forEach((dot) => {
  dot.addEventListener("click", () => {
    sliderImgIndex = dotIndicators.indexOf(dot);
    testimonialsCont.style.transform =
      "translateX(calc(" +
      -100 * sliderImgIndex +
      "% - " +
      sliderImgIndex * 1 +
      "rem))";
    document
      .querySelector(".dot-indicator.selected")
      .classList.remove("selected");
    dot.classList.add("selected");
  });
});

function testimonialTouchstartHandler(e) {
  testimonialsCont.addEventListener("touchend", testimonialTouchendHandler);
  testimonialsCont.addEventListener("touchmove", testimonialTouchmoveHandler);

  testimonialsCont.classList.add("scrolling");
  testimonialPos = {
    left: testimonialsCont.scrollLeft,
    x: e.touches[0].clientX,
  };
}
function testimonialTouchendHandler(e) {
  testimonialsCont.removeEventListener("touchend", testimonialTouchendHandler);
  testimonialsCont.removeEventListener(
    "touchmove",
    testimonialTouchmoveHandler
  );
}
function testimonialTouchmoveHandler(e) {
  const dx = e.touches[0].clientX - testimonialPos.x;
  testimonialsCont.scrollLeft = testimonialPos.left - dx;
}

function testimonialMouseDownHandler(e) {
  testimonialsCont.addEventListener("mousemove", testimonialMouseMoveHandler);
  testimonialsCont.addEventListener("mouseup", testimonialMouseUpHandler);
  testimonialsCont.addEventListener("mouseleave", testimonialMouseUpHandler);

  testimonialsCont.classList.add("scrolling");
  testimonialPos = {
    left: testimonialsCont.scrollLeft,
    x: e.clientX,
  };
}
function testimonialMouseMoveHandler(e) {
  const dx = (e.clientX - testimonialPos.x) * 1.25;
  testimonialsCont.scrollLeft = testimonialPos.left - dx;
}

function testimonialMouseUpHandler() {
  testimonialsCont.classList.remove("scrolling");
  testimonialsCont.removeEventListener(
    "mousemove",
    testimonialMouseMoveHandler
  );
  testimonialsCont.removeEventListener("mouseup", testimonialMouseUpHandler);
  testimonialsCont.removeEventListener("mouseleave", testimonialMouseUpHandler);
}
function emailValidator(e) {
  e.preventDefault();
  const emailRegex =
    /(^[a-zA-Z0-9]{1,}([!#$%&'*+-/=_`?^{|.][a-zA-Z0-9]{1,})*?)+@([a-zA-Z0-9]([-.][a-zA-Z0-9])*){1,}\.[a-zA-Z]{2,3}$/g;
  const emailValue = emailInput.value;
  if (
    !emailValue.match(emailRegex) ||
    emailValue.split("@")[0].length > 64 ||
    emailValue.split("@")[1].split(".")[0].length > 253
  ) {
    emailInput.classList.add("invalid-input");
  } else {
    emailInput.classList.remove("invalid-input");
    emailInput.classList.add("validated");
  }
}
