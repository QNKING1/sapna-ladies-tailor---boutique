/* ============================================================
   BOOKING — polite validation, then hand off to WhatsApp
   No backend, no storage, no price anywhere.
   ============================================================ */
(function () {
  "use strict";

  function init() {
    var form = document.getElementById("booking-form");
    if (!form) return;

    var cfg = window.SITE_CONFIG || {};
    var number = cfg.WHATSAPP_NUMBER || "923112424038";
    var businessName =
      cfg.BUSINESS_NAME || "Sapna Ladies Tailor & Boutique";

    var success = document.getElementById("form-success");
    var successLink = document.getElementById("success-wa");
    var fallback = document.getElementById("form-fallback");
    var status = document.getElementById("form-status");
    var reset = document.getElementById("reset-form");
    var submit = form.querySelector('button[type="submit"]');

    var fields = {
      name: document.getElementById("bf-name"),
      interest: document.getElementById("bf-interest"),
      day: document.getElementById("bf-day"),
      time: document.getElementById("bf-time"),
      notes: document.getElementById("bf-notes")
    };

    function wrapOf(field) {
      return field ? field.closest(".field") : null;
    }

    function setError(field, message) {
      var wrap = wrapOf(field);
      if (!wrap) return;
      var error = wrap.querySelector(".field-error");
      wrap.classList.toggle("has-error", !!message);
      if (field) field.setAttribute("aria-invalid", message ? "true" : "false");
      if (error) error.textContent = message || "";
    }

    function clearError(field) {
      setError(field, "");
    }

    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      if (!field) return;
      ["input", "change", "blur"].forEach(function (evt) {
        field.addEventListener(evt, function () {
          if (field.value.trim()) clearError(field);
        });
      });
    });

    function validDate(value) {
      if (!value) return false;
      var parts = value.split("-");
      if (parts.length !== 3) return false;
      var chosen = new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
      );
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      return chosen.getTime() >= today.getTime();
    }

    function readDate(value) {
      if (!value) return "";
      var parts = value.split("-");
      var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }

    function validate() {
      var firstBad = null;

      if (!fields.name.value.trim() || fields.name.value.trim().length < 2) {
        setError(fields.name, "Please tell us your name.");
        firstBad = firstBad || fields.name;
      } else {
        clearError(fields.name);
      }

      if (!fields.interest.value) {
        setError(fields.interest, "Please choose what you are looking for.");
        firstBad = firstBad || fields.interest;
      } else {
        clearError(fields.interest);
      }

      if (!validDate(fields.day.value)) {
        setError(fields.day, "Please pick a day from today onwards.");
        firstBad = firstBad || fields.day;
      } else {
        clearError(fields.day);
      }

      if (!fields.time.value) {
        setError(fields.time, "Please choose a time of day.");
        firstBad = firstBad || fields.time;
      } else {
        clearError(fields.time);
      }

      if (firstBad) {
        firstBad.focus({ preventScroll: true });
        var wrap = wrapOf(firstBad);
        if (wrap) {
          wrap.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return false;
      }
      return true;
    }

    function buildMessage() {
      var lines = [
        "Assalam o Alaikum, I would like to book an appointment at " +
          businessName +
          ".",
        "",
        "Name: " + fields.name.value.trim(),
        "Looking for: " + fields.interest.value,
        "Preferred day: " + readDate(fields.day.value),
        "Preferred time: " + fields.time.value
      ];

      var notes = fields.notes ? fields.notes.value.trim() : "";
      if (notes) {
        lines.push("Notes: " + notes);
      }

      lines.push("", "Please let me know if this works. Thank you.");
      return lines.join("\n");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (status) status.textContent = "";
      if (fallback) fallback.hidden = true;

      if (!validate()) return;

      var message = buildMessage();
      var url =
        "https://wa.me/" + number + "?text=" + encodeURIComponent(message);

      if (successLink) successLink.href = url;
      if (fallback) {
        fallback.href = url;
        fallback.hidden = false;
      }

      var opened = null;
      try {
        opened = window.open(url, "_blank", "noopener");
      } catch (err) {
        opened = null;
      }

      if (submit) {
        submit.disabled = true;
        submit.classList.add("is-sending");
      }

      /* show the confirmation state */
      if (success) {
        success.hidden = false;
        form.hidden = true;
        success.classList.add("is-visible");
        if (fallback) {
          /* the fallback belongs to the form, move it into the success card */
          success.appendChild(fallback);
          fallback.hidden = !!opened;
        }
      }

      if (!opened && status) {
        status.textContent =
          "WhatsApp did not open automatically. Use the link below to continue.";
      }

      /* reset the submit button after the page has had time to hand off */
      window.setTimeout(function () {
        if (submit) {
          submit.disabled = false;
          submit.classList.remove("is-sending");
        }
      }, 1600);
    });

    if (reset) {
      reset.addEventListener("click", function () {
        form.reset();
        form.hidden = false;
        Object.keys(fields).forEach(function (key) {
          clearError(fields[key]);
        });
        if (status) status.textContent = "";
        if (success) {
          success.hidden = true;
          success.classList.remove("is-visible");
        }
        if (fallback) {
          form.appendChild(fallback);
          fallback.hidden = true;
        }
        var name = fields.name;
        if (name) name.focus();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
