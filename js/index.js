
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

// Validate number of days and append them, based on selected Month
const validateDaysInMonth = (event) => {
    const days = daysInMonth(event.target.value);

    return appendDays(days);
}

// Validate year, we must check this if we want to be sure
// to user will not choose 29 day of February when year is not leap
const validateYear = () => {
    const monthsSelect = htmlELements().monthsSelector;

    if (monthsSelect.value !== 'selectcard') {
        const days = daysInMonth(monthsSelect.value);
        return appendDays(days);
    }
}

// Helper function which returns correct number of days if year is leap or not
// Also checks this only for month 02
const daysInMonth = (month) => {
    const yearsSelect = htmlELements().yearsSelector;
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
    const dateContainer = htmlELements().dateContainer;

    return dateContainer.innerText = date;
}

// Function for checking filled fields in form
// As return it shows or hide complete Date
const getDate = () => {
    const form = htmlELements().form;
    const formData = new FormData(form);

    const formState = [formData.get('month'), formData.get('day'), formData.get('year')];
    const date = formState.filter((item) => item === null ? false : true)

    return (date.length === 3) ?
        dateMessage(moment(date.join('-'), 'MM-DD-YYYY').format('ddd, ll')) :
        dateMessage('Select full date to see it here...');
}

// Triger init function
init();
