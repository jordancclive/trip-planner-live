let renderSelector = (id, data)=> {
  $(id).empty();
  var dropdown = data.map(function(dataObject){
    return "<option>"+dataObject.name+"</option>";
  });
  $(id).append(dropdown.join(''));
}

renderSelector('#hotel-choices', hotels);
