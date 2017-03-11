let renderSelector = (id, data, mode, updateDayFnc) => {
    $(id).empty();
    var dropdown = data.map(function(dataObject) {
        return "<option>" + dataObject.name + "</option>";
    });

    var button = $(id).siblings('button');
    button.on('click', function(){
        updateDayFnc(id, data, mode);
    });
    $(id).append(dropdown.join(''));
};

const updateDay = function(id, data, mode){
    var selectedIndex = $(id + ' option:selected').index();
    var selectedData = data[selectedIndex];
    state.days[state.selectedDayIdx][mode] = selectedData;
}

const renderDaySelector = (className, idx) => {
    const selectors = state.days.map((day, index) => {
        if (index === idx){
            return `<button class="btn btn-circle day-btn current-day">${index + 1}</button>`;
        }
        return `<button class="btn btn-circle day-btn">${index + 1}</button>`;
    });
    $(className).empty();
    $(className).append(selectors.join(''));
};

function renderAll() {
    renderSelector('#hotel-choices', hotels, 'hotel', updateDay);
    renderSelector('#restaurant-choices', restaurants, 'resturant', updateDay);
    renderSelector('#activity-choices', activities, 'activity', updateDay);
    renderDaySelector('.day-buttons', state.selectedDayIdx);
}

renderAll();
