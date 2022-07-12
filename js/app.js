(() => {
  "use strict";
  function isWebp() {
    function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
        callback(2 == webP.height);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
      let className = true === support ? "webp" : "no-webp";
      document.documentElement.classList.add(className);
    });
  }
  let addWindowScrollEvent = false;
  setTimeout(() => {
    if (addWindowScrollEvent) {
      let windowScroll = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(windowScroll);
      });
    }
  }, 0);
  let script_checkbox = document.querySelector(".checkbox-custom");
  if (script_checkbox)
    script_checkbox.addEventListener("click", function () {
      let checkEl = document.querySelector(".checkbox__label");
      checkEl.classList.toggle("_active-el");
      script_checkbox.classList.toggle("_active-check");
    });

  const form = document.querySelector(".registration__form");
  const checkel = document.querySelector(".checkbox__label");

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
  }
  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      formRemoveErrorCheck(checkel);
      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains("_tel")) {
        if (validatePhone(input)) {
          console.log("Не прошёл валидацию");
          formAddError(input);
          error++;
        } else {
        }
        console.log("Прошёл валидацию");
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        formAddErrorCheck(checkel);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  function formRemoveErrorCheck(checkel) {
    checkel.classList.remove("_error");
  }
  function formAddErrorCheck(checkel) {
    checkel.classList.add("_error");
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  function validatePhone(input) {
    return !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
      input.value
    );
  }
  window["FLS"] = true;
  isWebp();
})();
