// Create config variable for all used HTML elements
const htmlElements = {
    daysSelector: document.getElementById('days'),
    monthsSelector: document.getElementById('months'),
    yearsSelector: document.getElementById('years'),
    dateContainer: document.getElementById('date'),
    form: document.getElementById('form'),
}

// Initialize default state for Months and Years
// We can't do it for days because we don't know which Month and Year (leap or not) is selected
const init = () => {
    appendMonths(htmlElements.monthsSelector);
    appendYears(htmlElements.yearsSelector);
};

// Helper function for appending days to HTML element
const appendDays = (numberOfDays) => {
    const daysSelect = htmlElements.daysSelector;
    const selectedDay = daysSelect.value;

    daysSelect.innerHTML = '<option selected disabled value="selectCard">Select a Day...</option>';

    for (let i = 1; i <= numberOfDays; i += 1) {
        const option = setOption(i, daysSelect);
        daysSelect.append(option);
    }

    if (selectedDay.value !== 'selectCard') {
        daysSelect.value = (parseInt(selectedDay, 10) > numberOfDays) ? numberOfDays.toString() : selectedDay;
    }
}

// Helper function for appending Months, triggered in init function
const appendMonths = (monthsSelector) => {
    for (let i = 1; i <= 12; i += 1) {
        const option = setOption(i);
        monthsSelector.append(option);
    }
}

// Helper function for appending Years, triggered in init function
const appendYears = (yearsSelector) => {
    const currentYear = moment().get('year');

    for (let i = currentYear; i >= currentYear - 120; i--) {
        const option = setOption(i);
        yearsSelector.append(option);
    }
}

// Validate number of days and append them, based on selected Month
const validateDaysInMonth = (event) => {
    const month = event.target.value;
    const days = daysInMonth(month);

    return appendDays(days);
}

// Validate year, we must check this if we want to be sure
// to user will not choose 29 day of February when year is not leap
const validateYear = () => {
    const monthsSelect = htmlElements.monthsSelector;

    if (monthsSelect.value !== 'selectCard') {
        const days = daysInMonth(monthsSelect.value);

        return appendDays(days);
    }
}

// Helper function which returns correct number of days if year is leap or not
// Also checks this only for month 02
const daysInMonth = (month) => {
    const yearsSelect = htmlElements.yearsSelector;
    let days = moment(month, "MM").daysInMonth();

    if (isLeapYear(yearsSelect.value) && month === '02') {
        days++;
    }

    return days;
}

// Helper function for checking leap/not leap year
const isLeapYear = (year) => moment([year]).isLeapYear();

// Helper function to set option element to select
const setOption = (i) => {
    const option = document.createElement('option');

    option.value = i < 10 ? `0${i}` : i;
    option.innerText = option.value;
    return option;
};

// Function for reseting form
const resetForm = (event) => {
    event.target.reset();
    dateMessage('Select full date to see it here...');
}

// Helper function for showing/hide date message
const dateMessage = (date) => {
    const dateContainer = htmlElements.dateContainer;

    return dateContainer.innerText = date;
}

// Function for checking filled fields in form
// As return it shows or hide complete Date
const getDate = () => {
    const form = htmlElements.form;
    const formData = new FormData(form);

    const formState = [formData.get('month'), formData.get('day'), formData.get('year')];
    const date = formState.filter((item) => item === null ? false : true)

    return (date.length === 3) ?
        dateMessage(moment(date.join('-'), 'MM-DD-YYYY').format('ddd, ll')) :
        dateMessage('Select full date to see it here...');
}

// Triger init function
init();
