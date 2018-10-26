
// Initialize default state for Months and Years
// We can't do it for days because we don't know which Month and Year (leap or not) is selected
const init = () => {
    appendMonths();
    appendYears();
};

// Create handler for all used HTML elements
const htmlELements = () => {
    return {
        daysSelector: document.getElementById('days'),
        monthsSelector: document.getElementById('months'),
        yearsSelector: document.getElementById('years'),
        dateContainer: document.getElementById('date'),
        form: document.getElementById('form'),
    }
}

// Validate number of days and append them, based on selected Month
const validateDaysInMonth = (event) => {
    const days = daysInMonth(event.target.value);

    appendDays(days);
}

// Helper function for appending days to HTML element
// Each time we must reset parent body
// To be sure to user will not choose a day which is not in curretn Month
const appendDays = (numberOfDays) => {
    const daysSelect = htmlELements().daysSelector;

    daysSelect.innerHTML = '<option selected disabled>Select a Day...</option>';

    for (let i = 1; i <= numberOfDays; i += 1) {
        const option = setOption(i, daysSelect);
        daysSelect.append(option);
    }
}

// Helper function for appending Months, triggered in init function
const appendMonths = () => {
    const monthsSelect = htmlELements().monthsSelector;

    for (let i = 1; i <= 12; i += 1) {
        const option = setOption(i);
        monthsSelect.append(option);
    }
}

// Helper function for appending Years, triggered in init function
const appendYears = () => {
    const yearsSelect = htmlELements().yearsSelector;
    const currentYear = moment().get('year');

    for (let i = currentYear; i >= currentYear - 120; i--) {
        const option = setOption(i);
        yearsSelect.append(option);
    }
}

// Helper function which returns correct number of days if year is leap or not
// Also checks this only for month 02
const daysInMonth = (month) => {
    const monthsSelect = htmlELements().monthsSelector;
    const yearsSelect = htmlELements().yearsSelector;
    let days = moment(month, "MM").daysInMonth();

    if (isLeapYear(yearsSelect) && monthsSelect.value === '02') {
        days++;
    }

    return days;
}

// Validate year, we must check this if we want to be sure
// to user will not choose 29 day of February when year is not leap
const validateYear = () => {
    const monthsSelect = htmlELements().monthsSelector;

    if (monthsSelect.value !== 'selectcard') {
        const days = daysInMonth(monthsSelect.value);
        appendDays(days);
    }
}

// Helper function for checking leap/not leap year
const isLeapYear = (element) => moment([element.value]).isLeapYear();

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
    hideDate();
}

// Helper function for showing date when all fields are filled
const showDate = (date) => {
    const dateContainer = htmlELements().dateContainer;

    dateContainer.innerHTML = moment(date, 'MM-DD-YYYY').format('ddd, ll');
}

// Helper function for hidding date when not all fields are filled
const hideDate = () => {
    const dateContainer = htmlELements().dateContainer;

    dateContainer.innerText = 'Select full date to see it here...';
}

// Function for checking filled fields in form
// As return it shows or hide complete Date
const getDate = () => {
    const form = htmlELements().form;
    const formData = new FormData(form);

    const date = [formData.get('month'), formData.get('day'), formData.get('year')];
    const checkDate = date.filter((item) => item === null ? false : true)

    return (checkDate.length === 3) ? showDate(date.join('-')) : hideDate();
}

// Triger init function
init();
