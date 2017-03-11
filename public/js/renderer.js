let renderSelector = (id, data) => {
    $(id).empty();
    var dropdown = data.map(function(dataObject) {
        return "<option>" + dataObject.name + "</option>";
    });
    $(id).append(dropdown.join(''));
}

function renderAll() {
    renderSelector('#hotel-choices', hotels);
    renderSelector('#restaurant-choices', restaurants);
    renderSelector('#activity-choices', activities);
}

renderAll();