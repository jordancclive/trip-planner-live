let renderSelector = (id, data, mode, updateDayFnc) => {
    $(id).empty();
    var dropdown = data.map(function(dataObject) {
        return "<option>" + dataObject.name + "</option>";
    });

    var button = $(id).siblings('button');
    button.on('click', function() {
        updateDayFnc(id, mode);
    });
    $(id).append(dropdown.join(''));
};

const updateDay = function(id, mode) {
    var selectedIndex = $(id + ' option:selected').index();
    state.days[state.selectedDayIdx][mode] = selectedIndex;
}

const renderDaySelector = (className, idx) => {
    const selectors = state.days.map((day, index) => {
        if (index === idx) {
            return `<button class="btn btn-circle day-btn current-day">${index + 1}</button>`;
        }
        return `<button class="btn btn-circle day-btn btn-func">${index + 1}</button>`;
    });

    selectors.push('<button class="btn btn-circle day-btn" id="day-add">+</button>');

    $(className).empty();
    $(className).append(selectors.join(''));
};

const renderDay = function(id, dayData) {
    $(id).empty();
    const hotel = dayData.hotel || null;
    const activities = dayData.activities || [];
    const resturants = dayData.resturants || [];
    var hotelString = hotel ? `<div>
      <h4>My Hotel</h4>
      <ul class="list-group">
          <div class="itinerary-item">
              <span class="title">${hotel.name}</span>
              <button class="btn btn-xs btn-danger remove btn-circle">x</button>
          </div>
      </ul>
  </div>` : `<div><h4>My Hotel</h4><ul class="list-group"></ul></div>`;
    var restaurantMap = resturants.map(restaurant => {
        return `<div class="itinerary-item">
                <span class="title">${restaurant.name}</span>
                <button class="btn btn-xs btn-danger remove btn-circle">x</button>
            </div>`;
    });
    var restaurantsString = `<div>
      <h4>My Restaurants</h4>
      <ul class="list-group">
        ${restaurantMap.join('')}
      </ul>
  </div>`;
    var activitiesMap = activities.map(activity => {
        return `<div class="itinerary-item">
        <span class="title">${activity.name}</span>
        <button class="btn btn-xs btn-danger remove btn-circle">x</button>
    </div>`;
    });
    var activitiesString = `<div>
      <h4>My Activities</h4>
      <ul class="list-group">
          ${activitiesMap.join('')}
      </ul>
  </div>`;
    $(id).append(hotelString);
    $(id).append(restaurantsString);
    $(id).append(activitiesString);
}

const addDay = function() {
    state.days.push({});
    renderDaySelector('.day-buttons', state.selectedDayIdx);
};

const selectDay = function(index) {
    state.selectedDayIdx = index;
    renderWholeDay();
};

const renderDayTitle = function(id, index) {
    $(id + ' span').text(`Day ${index + 1}`);
}

const renderWholeDay = function() {
    renderDaySelector('.day-buttons', state.selectedDayIdx, addDay);
    renderDay('#itinerary', state.days[state.selectedDayIdx]);
    renderDayTitle('#day-title', state.selectedDayIdx);
};

const wireUpDaySelector = function(className) {
    $(className).on('click', '#day-add', function() {
        addDay();
    });
    $(className).on('click', '.btn-func', function() {
        const index = $(this).index();
        selectDay(index);
    });
};
let wiredup = false;

function renderAll() {
    renderSelector('#hotel-choices', hotels, 'hotel', updateDay);
    renderSelector('#restaurant-choices', restaurants, 'resturant', updateDay);
    renderSelector('#activity-choices', activities, 'activity', updateDay);
    renderWholeDay();
    if (!wiredup) {
        wiredup = true;
        wireUpDaySelector('.day-buttons');
    }
}

renderAll();