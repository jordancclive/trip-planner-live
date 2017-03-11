let renderSelector = (id, data) => {
    $(id).empty();
    var dropdown = data.map(function(dataObject) {
        return "<option>" + dataObject.name + "</option>";
    });

    var button = $(id).siblings('button');
    button.on('click', function(){
        var selectedIndex = $(id + ' option:selected').index();
        var selectedData = data[selectedIndex];
        console.log(selectedData.name);
    });
    $(id).append(dropdown.join(''));
}
// $('#hotel-choices option:selected');

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
    renderSelector('#hotel-choices', hotels);
    renderSelector('#restaurant-choices', restaurants);
    renderSelector('#activity-choices', activities);
    renderDaySelector('.day-buttons', state.selectedDayIdx);
}

renderAll();
