let renderSelector = (id, data, mode, updateDayFnc) => {
    $(id).empty();
    var dropdown = data.map(function(dataObject) {
        return "<option>" + dataObject.name + "</option>";
    });

    var button = $(id).siblings('button');
    button.on('click', function(){
        updateDayFnc(id, mode);
    });
    $(id).append(dropdown.join(''));
};

const updateDay = function(id, mode){
    var selectedIndex = $(id + ' option:selected').index();
    state.days[state.selectedDayIdx][mode] = selectedIndex;
}

const renderDaySelector = (className, idx) => {
    const selectors = state.days.map((day, index) => {
        if (index === idx){
            return `<button class="btn btn-circle day-btn current-day">${index + 1}</button>`;
        }
        return `<button class="btn btn-circle day-btn btn-func">${index + 1}</button>`;
    });

    selectors.push('<button class="btn btn-circle day-btn" id="day-add">+</button>');

    $(className).empty();
    $(className).append(selectors.join(''));
};

const addDay = function(){
    state.days.push({});
    renderDaySelector('.day-buttons', state.selectedDayIdx);
};

const wireUpDaySelector = function(className){
     $(className).on('click', '#day-add', function(){
         addDay();
     });
};

function renderAll() {
    renderSelector('#hotel-choices', hotels, 'hotel', updateDay);
    renderSelector('#restaurant-choices', restaurants, 'resturant', updateDay);
    renderSelector('#activity-choices', activities, 'activity', updateDay);
    renderDaySelector('.day-buttons', state.selectedDayIdx, addDay);
    wireUpDaySelector('.day-buttons');
}

renderAll();
