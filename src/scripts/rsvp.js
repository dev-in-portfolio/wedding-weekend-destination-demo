/**
 * Multi-Event Weekend RSVP Controller with Inline Validation
 * Site 4: Wedding Weekend / Destination Demo
 */

import { openDemoModal } from './modals.js';

export function initRsvp() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  const statusEl = document.getElementById('rsvp-status');
  const nameInput = document.getElementById('guest-name');
  const nameError = document.getElementById('guest-name-error');
  const emailInput = document.getElementById('guest-email');
  const emailError = document.getElementById('guest-email-error');
  const attendRadios = form.querySelectorAll('input[name="attending"]');
  const attendanceError = document.getElementById('attendance-error');

  const attendingDetailsGroup = document.getElementById('attending-conditional-fields');
  const eventCheckboxes = form.querySelectorAll('input[name="events"]');
  const eventsError = document.getElementById('events-error');
  const saturdayEventCheck = document.getElementById('event-saturday');
  const saturdayMealGroup = document.getElementById('saturday-meal-group');
  const mealSelect = document.getElementById('guest-meal');
  const mealError = document.getElementById('guest-meal-error');

  const plusOneCheckbox = document.getElementById('plus-one-check');
  const plusOneDetails = document.getElementById('plus-one-details');
  const plusOneNameInput = document.getElementById('plus-one-name');
  const plusOneNameError = document.getElementById('plus-one-name-error');
  const plusOneMealGroup = document.getElementById('plus-one-meal-group');
  const plusOneMealSelect = document.getElementById('plus-one-meal');
  const plusOneMealError = document.getElementById('plus-one-meal-error');

  const transportCheckbox = document.getElementById('shuttle-check');
  const transportDetails = document.getElementById('shuttle-details');
  const transportSelect = document.getElementById('shuttle-hotel');
  const transportError = document.getElementById('shuttle-error');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, errorEl, msg) {
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('has-error');
    }
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.removeAttribute('hidden');
    }
  }

  function clearError(input, errorEl) {
    if (input) {
      input.setAttribute('aria-invalid', 'false');
      input.classList.remove('has-error');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.setAttribute('hidden', '');
    }
  }

  function updateAttendanceView() {
    const attendingSelected = form.querySelector('input[name="attending"]:checked');
    const isAttending = attendingSelected && attendingSelected.value === 'yes';

    if (attendanceError) {
      attendanceError.textContent = '';
      attendanceError.setAttribute('hidden', '');
    }

    if (isAttending) {
      if (attendingDetailsGroup) {
        attendingDetailsGroup.removeAttribute('hidden');
        attendingDetailsGroup.style.display = 'block';
      }
      // Show Saturday meal only if Saturday event is checked
      if (saturdayMealGroup && saturdayEventCheck) {
        if (saturdayEventCheck.checked) {
          saturdayMealGroup.removeAttribute('hidden');
          saturdayMealGroup.style.display = 'block';
        } else {
          saturdayMealGroup.setAttribute('hidden', '');
          saturdayMealGroup.style.display = 'none';
        }
      }
      // Plus-one meal group if plus-one checked
      if (plusOneMealGroup && plusOneCheckbox && saturdayEventCheck) {
        if (plusOneCheckbox.checked && saturdayEventCheck.checked) {
          plusOneMealGroup.removeAttribute('hidden');
          plusOneMealGroup.style.display = 'block';
        } else {
          plusOneMealGroup.setAttribute('hidden', '');
          plusOneMealGroup.style.display = 'none';
        }
      }
    } else {
      // If declining or neither selected
      if (attendingDetailsGroup) {
        attendingDetailsGroup.setAttribute('hidden', '');
        attendingDetailsGroup.style.display = 'none';
      }
      if (saturdayMealGroup) {
        saturdayMealGroup.setAttribute('hidden', '');
        saturdayMealGroup.style.display = 'none';
      }
      // Clear all attending-only errors
      if (eventsError) {
        eventsError.textContent = '';
        eventsError.setAttribute('hidden', '');
      }
      clearError(mealSelect, mealError);
      clearError(plusOneNameInput, plusOneNameError);
      clearError(plusOneMealSelect, plusOneMealError);
      clearError(transportSelect, transportError);
    }
  }

  let isResetting = false;
  function resetFormState() {
    if (isResetting) return;
    isResetting = true;

    form.reset();
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.setAttribute('hidden', '');
    }
    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    if (attendanceError) {
      attendanceError.textContent = '';
      attendanceError.setAttribute('hidden', '');
    }
    if (eventsError) {
      eventsError.textContent = '';
      eventsError.setAttribute('hidden', '');
    }
    clearError(mealSelect, mealError);
    clearError(plusOneNameInput, plusOneNameError);
    clearError(plusOneMealSelect, plusOneMealError);
    clearError(transportSelect, transportError);

    // Initial state: attending-conditional-fields hidden
    if (attendingDetailsGroup) {
      attendingDetailsGroup.setAttribute('hidden', '');
      attendingDetailsGroup.style.display = 'none';
    }
    // Saturday meal group hidden
    if (saturdayMealGroup) {
      saturdayMealGroup.setAttribute('hidden', '');
      saturdayMealGroup.style.display = 'none';
    }
    // Plus-one hidden & unchecked
    if (plusOneCheckbox) plusOneCheckbox.checked = false;
    if (plusOneDetails) {
      plusOneDetails.setAttribute('hidden', '');
      plusOneDetails.style.display = 'none';
    }
    if (plusOneMealGroup) {
      plusOneMealGroup.setAttribute('hidden', '');
      plusOneMealGroup.style.display = 'none';
    }
    // Shuttle hidden & unchecked
    if (transportCheckbox) transportCheckbox.checked = false;
    if (transportDetails) {
      transportDetails.setAttribute('hidden', '');
      transportDetails.style.display = 'none';
    }

    isResetting = false;
  }

  // Set pristine initial state on mount
  resetFormState();
  form.addEventListener('reset', () => {
    if (!isResetting) {
      setTimeout(resetFormState, 0);
    }
  });

  // Attendance Radio Change: Show/Hide Attending-Specific Fields
  attendRadios.forEach(radio => {
    radio.addEventListener('change', updateAttendanceView);
  });

  // Saturday Event Checkbox Change: Show/Hide Meal Selection
  if (saturdayEventCheck && saturdayMealGroup) {
    saturdayEventCheck.addEventListener('change', () => {
      const attendingSelected = form.querySelector('input[name="attending"]:checked');
      const isAttending = attendingSelected && attendingSelected.value === 'yes';
      if (!isAttending) return;

      if (saturdayEventCheck.checked) {
        saturdayMealGroup.removeAttribute('hidden');
        saturdayMealGroup.style.display = 'block';
        if (plusOneMealGroup && plusOneCheckbox && plusOneCheckbox.checked) {
          plusOneMealGroup.removeAttribute('hidden');
          plusOneMealGroup.style.display = 'block';
        }
      } else {
        saturdayMealGroup.setAttribute('hidden', '');
        saturdayMealGroup.style.display = 'none';
        clearError(mealSelect, mealError);
        if (plusOneMealGroup) {
          plusOneMealGroup.setAttribute('hidden', '');
          plusOneMealGroup.style.display = 'none';
          clearError(plusOneMealSelect, plusOneMealError);
        }
      }
    });
  }

  // Plus-One Checkbox Toggle
  if (plusOneCheckbox && plusOneDetails) {
    plusOneCheckbox.addEventListener('change', () => {
      if (plusOneCheckbox.checked) {
        plusOneDetails.removeAttribute('hidden');
        plusOneDetails.style.display = 'block';
        if (plusOneNameInput) plusOneNameInput.focus();
        if (saturdayEventCheck && saturdayEventCheck.checked && plusOneMealGroup) {
          plusOneMealGroup.removeAttribute('hidden');
          plusOneMealGroup.style.display = 'block';
        }
      } else {
        plusOneDetails.setAttribute('hidden', '');
        plusOneDetails.style.display = 'none';
        clearError(plusOneNameInput, plusOneNameError);
        clearError(plusOneMealSelect, plusOneMealError);
      }
    });
  }

  // Transportation Shuttle Checkbox Toggle
  if (transportCheckbox && transportDetails) {
    transportCheckbox.addEventListener('change', () => {
      if (transportCheckbox.checked) {
        transportDetails.removeAttribute('hidden');
        transportDetails.style.display = 'block';
        if (transportSelect) transportSelect.focus();
      } else {
        transportDetails.setAttribute('hidden', '');
        transportDetails.style.display = 'none';
        clearError(transportSelect, transportError);
      }
    });
  }

  // Form Submission Validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    let errorCount = 0;
    let firstInvalidControl = null;

    // 1. Validate Guest Name
    if (!name) {
      showError(nameInput, nameError, 'Please enter your full name.');
      errorCount++;
      if (!firstInvalidControl) firstInvalidControl = nameInput;
    } else {
      clearError(nameInput, nameError);
    }

    // 2. Validate Email
    if (!email) {
      showError(emailInput, emailError, 'Please enter your email address.');
      errorCount++;
      if (!firstInvalidControl) firstInvalidControl = emailInput;
    } else if (!isValidEmail(email)) {
      showError(emailInput, emailError, 'Please enter a valid email address (e.g. guest@example.com).');
      errorCount++;
      if (!firstInvalidControl) firstInvalidControl = emailInput;
    } else {
      clearError(emailInput, emailError);
    }

    // 3. Validate Attendance Radio
    const attendingSelected = form.querySelector('input[name="attending"]:checked');
    if (!attendingSelected) {
      if (attendanceError) {
        attendanceError.textContent = 'Please indicate whether you will be attending the wedding weekend.';
        attendanceError.removeAttribute('hidden');
      }
      errorCount++;
      if (!firstInvalidControl && attendRadios.length > 0) firstInvalidControl = attendRadios[0];
    } else {
      if (attendanceError) {
        attendanceError.textContent = '';
        attendanceError.setAttribute('hidden', '');
      }
    }

    // 4. Conditional Validations When Attending Weekend
    const isAttending = attendingSelected && attendingSelected.value === 'yes';
    if (isAttending) {
      // Validate at least one event selected
      const selectedEvents = form.querySelectorAll('input[name="events"]:checked');
      if (selectedEvents.length === 0) {
        if (eventsError) {
          eventsError.textContent = 'Please select at least one weekend event you plan to attend.';
          eventsError.removeAttribute('hidden');
        }
        errorCount++;
        if (!firstInvalidControl && eventCheckboxes.length > 0) firstInvalidControl = eventCheckboxes[0];
      } else {
        if (eventsError) {
          eventsError.textContent = '';
          eventsError.setAttribute('hidden', '');
        }
      }

      // If Saturday wedding is selected, validate dinner entree
      const attendsSaturday = saturdayEventCheck && saturdayEventCheck.checked;
      if (attendsSaturday) {
        if (mealSelect && !mealSelect.value) {
          showError(mealSelect, mealError, 'Please select your Saturday dinner entrée preference.');
          errorCount++;
          if (!firstInvalidControl) firstInvalidControl = mealSelect;
        } else {
          clearError(mealSelect, mealError);
        }
      } else {
        clearError(mealSelect, mealError);
      }

      // If Plus-One is checked, validate plus-one name and meal
      if (plusOneCheckbox && plusOneCheckbox.checked) {
        if (plusOneNameInput && !plusOneNameInput.value.trim()) {
          showError(plusOneNameInput, plusOneNameError, "Please enter your plus-one's full name.");
          errorCount++;
          if (!firstInvalidControl) firstInvalidControl = plusOneNameInput;
        } else {
          clearError(plusOneNameInput, plusOneNameError);
        }

        if (attendsSaturday && plusOneMealSelect && !plusOneMealSelect.value) {
          showError(plusOneMealSelect, plusOneMealError, 'Please select an entrée for your plus-one.');
          errorCount++;
          if (!firstInvalidControl) firstInvalidControl = plusOneMealSelect;
        } else {
          clearError(plusOneMealSelect, plusOneMealError);
        }
      } else {
        clearError(plusOneNameInput, plusOneNameError);
        clearError(plusOneMealSelect, plusOneMealError);
      }

      // If Transport is checked, validate pickup hotel
      if (transportCheckbox && transportCheckbox.checked) {
        if (transportSelect && !transportSelect.value) {
          showError(transportSelect, transportError, 'Please select your shuttle pickup location.');
          errorCount++;
          if (!firstInvalidControl) firstInvalidControl = transportSelect;
        } else {
          clearError(transportSelect, transportError);
        }
      } else {
        clearError(transportSelect, transportError);
      }
    } else {
      // Declining: clear all attending-only errors
      clearError(mealSelect, mealError);
      clearError(plusOneNameInput, plusOneNameError);
      clearError(plusOneMealSelect, plusOneMealError);
      clearError(transportSelect, transportError);
      if (eventsError) {
        eventsError.textContent = '';
        eventsError.setAttribute('hidden', '');
      }
    }

    // Handle Errors
    if (errorCount > 0) {
      if (statusEl) {
        statusEl.textContent = `Please correct the ${errorCount} error${errorCount > 1 ? 's' : ''} highlighted below before submitting.`;
        statusEl.removeAttribute('hidden');
      }
      if (firstInvalidControl) {
        firstInvalidControl.focus();
      }
      return;
    }

    // Success Handling (Demo Only - Zero submission/storage)
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.setAttribute('hidden', '');
    }

    const guestName = nameInput ? nameInput.value.trim() : 'Guest';
    openDemoModal({
      title: isAttending ? 'RSVP Demonstration (Attending)' : 'Response Demonstration (Declining)',
      badge: 'Multi-Event Weekend RSVP Demo',
      message: isAttending
        ? `Thank you, ${guestName}! Weekend RSVP interaction demonstrated successfully. No information was submitted or stored because this is a fictional DSCG sales demonstration. On a live client website, multi-event destination RSVP responses can be configured for the approved guest-management workflow.`
        : `Thank you, ${guestName}. Response interaction demonstrated successfully. No information was submitted or stored because this is a fictional DSCG sales demonstration. On a live client website, guest responses can be configured for the approved guest-management workflow.`
    });

    // Form Reset - Restore clean initial state
    resetFormState();
  });
}
